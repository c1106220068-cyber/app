
import { Job, UserProfile, ScenarioQuestion } from './types';

export const MOCK_USER: UserProfile = {
  name: "陈小墨",
  title: "待探索",
  level: 1,
  traits: {
    visual: 50,
    logic: 50,
    empathy: 50,
    grit: 50,
    ambition: 50,
    creativity: 50
  },
  hiddenPotential: [],
  activeMission: "寻找引力场..."
};

// ---------------------------------------------------------
// NEW: Life Metaphor Test (O-P-D-I Model)
// ---------------------------------------------------------
export const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 1,
    category: 'O-P-D-I',
    question: "如果要在荒原上建造一座建筑，你会选择？", // Legacy hook
    context: "朋友们决定去一个从未去过的国家自由行。在出发前，大家自然而然地开始分工。你最想承担的角色是？",
    options: [
      {
        id: 'A',
        text: "攻略大神 (The Planner)",
        description: "查遍交通酒店性价比，做成精确到分钟的 Excel 表。",
        traits: { logic: 20, grit: 10, ambition: 5 },
        keywords: ['数据分析', '财务', '后端开发', '审计', '供应链']
      },
      {
        id: 'B',
        text: "外交官 (The Diplomat)",
        description: "负责问路、砍价、和当地人聊天，解决突发状况。",
        traits: { empathy: 20, ambition: 10, logic: -5 },
        keywords: ['销售', '公关(PR)', 'HR', '商务BD', '咨询']
      },
      {
        id: 'C',
        text: "Vlog 导演 (The Creator)",
        description: "只管发现美景，负责把旅行拍得好看，发朋友圈。",
        traits: { visual: 20, creativity: 15, logic: -5 },
        keywords: ['UI设计', '内容运营', '市场营销', '产品经理']
      },
      {
        id: 'D',
        text: "探险队长 (The Doer)",
        description: "负责开车、搬行李、修理坏掉的设备，确保大家安全。",
        traits: { grit: 20, logic: 10, empathy: 5 },
        keywords: ['硬件工程', '项目管理', '土木', '活动执行']
      }
    ]
  },
  {
    id: 2,
    category: 'Personality',
    question: "危机处理反应",
    context: "你在经营一家咖啡店，突然停电了，客人开始抱怨躁动。你的第一反应是？",
    options: [
      {
        id: 'A',
        text: "安抚人心",
        description: "立刻送每人一张优惠券，陪客人聊天缓解尴尬。",
        traits: { empathy: 25, ambition: 5 },
        keywords: ['客户成功', '人力资源', '教师', '心理咨询']
      },
      {
        id: 'B',
        text: "解决故障",
        description: "立刻冲向电箱检查线路，或者联系物业计算损失。",
        traits: { logic: 20, grit: 15 },
        keywords: ['运维工程师', '店长', '物流管理', '测试开发']
      },
      {
        id: 'C',
        text: "借势营销",
        description: "点起蜡烛，搞一个“黑暗烛光咖啡夜”活动。",
        traits: { creativity: 25, ambition: 15 },
        keywords: ['创业者', '广告创意', '新媒体运营']
      }
    ]
  },
  {
    id: 3,
    category: 'O-P-D-I',
    question: "工作流偏好",
    context: "如果不考虑薪资，你更喜欢哪种工作状态带来的成就感？",
    options: [
      {
        id: 'A',
        text: "从无到有 (Idea -> Product)",
        description: "构思一个点子，并把它画出来或写出来。",
        traits: { creativity: 20, visual: 15 },
        keywords: ['游戏策划', '建筑设计', '编剧']
      },
      {
        id: 'B',
        text: "优化效率 (Chaos -> Order)",
        description: "看着混乱的数据或流程变整齐，效率翻倍。",
        traits: { logic: 25, grit: 5 },
        keywords: ['数据科学', '算法', '法务合规']
      },
      {
        id: 'C',
        text: "影响他人 (Influence)",
        description: "通过演讲或沟通，改变了一群人的想法。",
        traits: { ambition: 20, empathy: 15 },
        keywords: ['投资经理', '律师', '培训师']
      }
    ]
  },
  {
    id: 4,
    category: 'Domain',
    question: "兴趣赛道",
    context: "你平时最关注哪类新闻或资讯？",
    options: [
      {
        id: 'A',
        text: "科技与未来",
        description: "AI、太空、硬核科技。",
        traits: { logic: 10, creativity: 10 },
        keywords: ['人工智能', '自动驾驶']
      },
      {
        id: 'B',
        text: "商业与搞钱",
        description: "股市、商业模式、大佬访谈。",
        traits: { ambition: 20, logic: 10 },
        keywords: ['金融分析', '战略咨询']
      },
      {
        id: 'C',
        text: "人文与艺术",
        description: "设计展、心理学、社会观察。",
        traits: { visual: 15, empathy: 15 },
        keywords: ['用户体验', '非标住宿']
      }
    ]
  }
];

// ---------------------------------------------------------
// BROAD SPECTRUM JOB POOL (Diverse Industries)
// ---------------------------------------------------------
export const JOB_POOL: Job[] = [
  // 1. Tech / Creative (Original)
  {
    id: 'j1',
    title: '文创产品经理',
    company: '未来视界',
    salary: '25k-40k',
    salaryValue: 80,
    matchScore: 0, 
    requiredTraits: { visual: 70, logic: 60, empathy: 85, grit: 50, ambition: 60, creativity: 80 },
    tags: ['同理心', '产品嗅觉', '用户体验'],
    rawDescription: "负责文创产品的全生命周期管理。",
    decodedDescription: "做「情感容器」。你需要像心理学家一样懂用户，像艺术家一样做定义。",
    pressurePoint: "商业与美学的平衡。",
    interviewFocus: "最近被哪款设计打动？",
    resources: [{ id: 'r1', type: 'video', title: '设计心理学', provider: 'Bilibili', url: '#' }],
    platformIcon: 'linkedin',
    platformStats: '创意权重高'
  },
  // 2. Tech / Logic
  {
    id: 'j2',
    title: '供应链算法工程师',
    company: '京东物流',
    salary: '35k-60k',
    salaryValue: 90,
    matchScore: 0,
    requiredTraits: { visual: 20, logic: 95, empathy: 20, grit: 80, ambition: 60, creativity: 60 },
    tags: ['运筹学', 'Python', '降本增效'],
    rawDescription: "优化仓储网络与配送路径。",
    decodedDescription: "在混乱的物理世界中寻找最优解。你的代码决定了货物是准时到达还是堵在路上。",
    pressurePoint: "大促期间的极端压力。",
    interviewFocus: "运筹优化案例。",
    resources: [{ id: 'r2', type: 'book', title: '供应链管理', provider: '京东', url: '#' }],
    platformIcon: 'boss',
    platformStats: '逻辑至上'
  },
  // 3. Human / Sales / Service
  {
    id: 'j3',
    title: '大客户销售总监 (KA)',
    company: '阿里云',
    salary: '40k-80k',
    salaryValue: 95,
    matchScore: 0,
    requiredTraits: { visual: 30, logic: 60, empathy: 90, grit: 95, ambition: 95, creativity: 50 },
    tags: ['谈判', '资源整合', '抗压'],
    rawDescription: "负责战略级客户的开拓与维护。",
    decodedDescription: "你是战场上的将军，也是客户的知己。需要极强的共情力来建立信任，极强的企图心来拿下单子。",
    pressurePoint: "千万级 KPI 的压迫感。",
    interviewFocus: "如何搞定一个拒绝你 3 次的客户？",
    resources: [{ id: 'r3', type: 'book', title: '销售巨人', provider: '当当', url: '#' }],
    platformIcon: 'linkedin',
    platformStats: '高薪高压'
  },
  // 4. Operations / Detail / Support
  {
    id: 'j4',
    title: '法务合规专员',
    company: '字节跳动',
    salary: '20k-35k',
    salaryValue: 70,
    matchScore: 0,
    requiredTraits: { visual: 20, logic: 90, empathy: 50, grit: 85, ambition: 40, creativity: 30 },
    tags: ['严谨', '风控', '合同'],
    rawDescription: "审核业务合同，识别法律风险。",
    decodedDescription: "你是企业的守门员。不需要天马行空，但需要滴水不漏。每一个字眼都可能是地雷。",
    pressurePoint: "业务方觉得你‘碍事’时的沟通成本。",
    interviewFocus: "对数据合规的理解。",
    resources: [{ id: 'r4', type: 'video', title: '法学思维', provider: 'Coursera', url: '#' }],
    platformIcon: 'job51',
    platformStats: '稳健防守'
  },
  // 5. Cross-Over / Strategy
  {
    id: 'j5',
    title: '人力资源BP (HRBP)',
    company: 'SHEIN',
    salary: '30k-50k',
    salaryValue: 85,
    matchScore: 0,
    requiredTraits: { visual: 40, logic: 70, empathy: 95, grit: 70, ambition: 60, creativity: 60 },
    tags: ['组织诊断', '政委', '沟通'],
    rawDescription: "深入业务部门，提供人力资源解决方案。",
    decodedDescription: "懂业务的 HR。你不是发工资的，你是业务老大的军师，是团队的润滑剂。",
    pressurePoint: "夹在员工与公司利益之间。",
    interviewFocus: "如何处理核心员工离职？",
    resources: [{ id: 'r5', type: 'book', title: '组织行为学', provider: '微信读书', url: '#' }],
    platformIcon: 'boss',
    platformStats: '人际枢纽'
  }
];

export const AI_SCRIPTS = {
  1: {
    text: "欢迎来到 Orbit 引力场。我们不看简历，只看你的「底层操作系统」。",
    action: "请代入以下生活场景，做出最本能的选择..."
  },
  2: {
    text: "正在扫描你的 O-P-D-I 基因... 看来你对[人]和[数据]的敏感度截然不同。",
    action: "正在生成你的职业云图..."
  },
  3: {
    text: "匹配完成。我们为你找到了核心赛道，以及一个可能让你惊讶的跨界赛道。",
    action: "点击卡片，查看你的职业族群。"
  },
  4: {
    text: "轨道已校准。无论你是独狼还是领袖，这里都有你的星系。",
    action: "准备启航。"
  }
};

export const MOCK_JOBS: Job[] = [];
