
import React, { useRef, useEffect } from 'react';

const BackgroundShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    // Standard Full-screen Triangle Vertex Shader
    const vsSource = `#version 300 es
      in vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    // The Stormy Torus Fragment Shader
    // Features: Volumetric Raymarching, FBM Noise, Dynamic Lighting
    const fsSource = `#version 300 es
      precision highp float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      
      out vec4 outColor;

      // --- Noise Functions ---
      float hash(float n) { return fract(sin(n) * 753.5453123); }

      float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          float n = p.x + p.y * 157.0 + 113.0 * p.z;
          return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                         mix(hash(n + 157.0), hash(n + 158.0), f.x), f.y),
                     mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                         mix(hash(n + 270.0), hash(n + 271.0), f.x), f.y), f.z);
      }

      // Fractal Brownian Motion for cloud details
      float fbm(vec3 p) {
          float f = 0.0;
          f += 0.500 * noise(p); p *= 2.01;
          f += 0.250 * noise(p); p *= 2.02;
          f += 0.125 * noise(p);
          return f;
      }

      // Rotation Matrix
      mat2 rot(float a) {
          float s = sin(a), c = cos(a);
          return mat2(c, -s, s, c);
      }

      // SDF for a Torus
      // t.x = major radius, t.y = tube radius
      float sdTorus(vec3 p, vec2 t) {
          vec2 q = vec2(length(p.xz) - t.x, p.y);
          return length(q) - t.y;
      }

      void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
          
          // --- Camera & Ray Setup ---
          vec3 ro = vec3(0.0, 0.0, -5.5); // Camera position
          vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction (Field of View)
          
          // Slowly rotate the camera/world
          float time = u_time * 0.05; // Very slow rotation
          mat2 r = rot(time);
          ro.xz *= r;
          rd.xz *= r;
          
          // Tilt the view slightly
          mat2 tilt = rot(0.4);
          ro.yz *= tilt;
          rd.yz *= tilt;

          vec4 sum = vec4(0.0); // Accumulated color/alpha
          float t_march = 0.0;  // Current distance along ray
          
          // --- Volumetric Raymarching ---
          for(int i = 0; i < 60; i++) {
              vec3 p = ro + rd * t_march;
              
              // Define the volume shape (Torus)
              // Radius 3.0, Tube Radius 1.4
              float torusDist = sdTorus(p, vec2(3.0, 1.4));
              
              // Only compute dense fog if we are relatively close to the torus surface or inside
              if(torusDist < 1.0) {
                  // Coordinate for noise (animate along Y for "flow")
                  vec3 q = p * 1.2 - vec3(0.0, u_time * 0.15, 0.0);
                  
                  // Get density from noise
                  float dens = fbm(q);
                  
                  // Mask the density to the torus shape
                  // Smoothly fade out density as we get further from the torus core (negative distance is inside)
                  float shape = smoothstep(0.5, -0.8, torusDist);
                  dens *= shape;
                  
                  // Contrast threshold to create "clumps" instead of uniform fog
                  // Lowered threshold slightly to make clouds fuller
                  float val = smoothstep(0.30, 0.8, dens);
                  
                  if(val > 0.001) {
                      // --- Color Palette (Orbit Theme) ---
                      // Base: Deep Sea Blue (#001B3D) -> Brightened for better visibility
                      // Highlight: Amber (#FFBF00)
                      
                      vec3 col = mix(vec3(0.0, 0.15, 0.4), vec3(0.1, 0.4, 0.8), val); // Brighter Blue gradient
                      col = mix(col, vec3(1.0, 0.75, 0.2), val * val * val); // Stronger Amber highlights
                      
                      // Add "Lightning" white cores
                      col += vec3(1.0) * smoothstep(0.85, 1.0, dens) * 0.9;

                      // Opacity calculation
                      // Increased alpha multiplier significantly for higher visibility
                      float alpha = val * 0.25; 
                      
                      // Accumulate (Front-to-back blending)
                      sum.rgb += col * alpha * (1.0 - sum.a);
                      sum.a += alpha * (1.0 - sum.a);
                  }
              }
              
              // Adaptive step size
              t_march += max(0.1, max(0.05, torusDist * 0.6));
              
              // Early exit
              if(sum.a > 0.98 || t_march > 15.0) break;
          }
          
          // --- Background (Deep Space) ---
          // Brighter background gradient to ensure the scene isn't too pitch black
          vec3 bg = mix(vec3(0.0, 0.02, 0.05), vec3(0.0, 0.1, 0.2), length(uv) * 0.6);
          
          // Composite volume over background
          vec3 finalColor = mix(bg, sum.rgb, sum.a);
          
          // Vignette
          finalColor *= 1.0 - dot(uv, uv) * 0.6;
          
          outColor = vec4(finalColor, 1.0);
      }
    `;

    const program = gl.createProgram();
    if (!program) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    
    if (!vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const positions = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (performance.now() - startTime) * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none" 
      style={{ opacity: 1.0 }} 
    />
  );
};

export default BackgroundShader;
