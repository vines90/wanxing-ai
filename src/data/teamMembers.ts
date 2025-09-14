export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: 'leadership' | 'instructor' | 'support';
  avatar: string;
  bio: string;
  experience: string;
  specialties: string[];
  education: string;
  personalInterests: string[];
  contactEmail?: string;
  officeHours?: string;
}

export const teamMembers: TeamMember[] = [
  // Leadership Team
  {
    id: 'founder-01',
    name: '张明华',
    position: '创始人兼CEO',
    department: 'leadership',
    avatar: '/images/team/zhang-minghua.jpg',
    bio: '拥有15年人工智能行业经验，曾在多家知名科技公司担任技术总监。致力于推动AI教育普及化，让更多人掌握未来技能。',
    experience: '15年AI行业经验，曾任腾讯AI Lab高级研究员，百度深度学习团队技术负责人',
    specialties: ['机器学习', '深度学习', '计算机视觉', '自然语言处理'],
    education: '清华大学计算机科学博士',
    personalInterests: ['围棋', '摄影', '马拉松'],
    contactEmail: 'zhang.minghua@wanxing-ai.com',
    officeHours: '周一至周五 9:00-12:00'
  },
  {
    id: 'cto-01',
    name: '李雅婷',
    position: '技术总监',
    department: 'leadership',
    avatar: '/images/team/li-yating.jpg',
    bio: '专注于AI教学课程设计和技术实施，拥有丰富的企业培训经验。主导开发了多个获奖的AI教育平台。',
    experience: '12年技术管理经验，曾任阿里巴巴达摩院技术专家',
    specialties: ['技术管理', '课程设计', '深度学习框架', '云计算'],
    education: '北京大学软件工程硕士',
    personalInterests: ['钢琴', '瑜伽', '科技阅读'],
    contactEmail: 'li.yating@wanxing-ai.com',
    officeHours: '周二、周四 14:00-17:00'
  },

  // Instructor Team
  {
    id: 'instructor-01',
    name: '王志强',
    position: '高级AI讲师',
    department: 'instructor',
    avatar: '/images/team/wang-zhiqiang.jpg',
    bio: '机器学习专家，擅长将复杂的算法原理用通俗易懂的方式讲解。已培养超过500名AI工程师。',
    experience: '8年AI教学经验，曾在中科院自动化所从事研究工作',
    specialties: ['机器学习算法', 'Python编程', '数据挖掘', '统计分析'],
    education: '中科院自动化所博士',
    personalInterests: ['象棋', '登山', '古典音乐'],
    contactEmail: 'wang.zhiqiang@wanxing-ai.com',
    officeHours: '周一、周三、周五 10:00-12:00'
  },
  {
    id: 'instructor-02',
    name: '陈美玲',
    position: '深度学习讲师',
    department: 'instructor',
    avatar: '/images/team/chen-meiling.jpg',
    bio: '深度学习技术专家，专注于计算机视觉和自然语言处理教学。Google TensorFlow认证讲师。',
    experience: '6年深度学习教学经验，发表多篇顶级会议论文',
    specialties: ['深度学习', 'TensorFlow', 'PyTorch', '计算机视觉'],
    education: '斯坦福大学人工智能硕士',
    personalInterests: ['绘画', '烘焙', '旅行'],
    contactEmail: 'chen.meiling@wanxing-ai.com',
    officeHours: '周二、周四 15:00-18:00'
  },
  {
    id: 'instructor-03',
    name: '刘建国',
    position: 'NLP讲师',
    department: 'instructor',
    avatar: '/images/team/liu-jianguo.jpg',
    bio: '自然语言处理专家，在智能对话系统和文本分析领域有丰富实战经验。',
    experience: '7年NLP研发和教学经验，曾参与多个大型NLP项目',
    specialties: ['自然语言处理', '对话系统', '文本分析', '知识图谱'],
    education: '复旦大学计算语言学博士',
    personalInterests: ['阅读', '书法', '历史'],
    contactEmail: 'liu.jianguo@wanxing-ai.com',
    officeHours: '周三、周五 13:00-16:00'
  },

  // Support Team
  {
    id: 'support-01',
    name: '赵晓敏',
    position: '教务主管',
    department: 'support',
    avatar: '/images/team/zhao-xiaomin.jpg',
    bio: '负责课程安排、学员管理和教学质量监控。用心服务每一位学员，确保最佳学习体验。',
    experience: '5年教育行业管理经验',
    specialties: ['教务管理', '课程规划', '学员服务', '质量管控'],
    education: '华南师范大学教育学硕士',
    personalInterests: ['花艺', '健身', '心理学'],
    contactEmail: 'zhao.xiaomin@wanxing-ai.com',
    officeHours: '周一至周五 9:00-17:00'
  },
  {
    id: 'support-02',
    name: '孙技术',
    position: '技术支持工程师',
    department: 'support',
    avatar: '/images/team/sun-jishu.jpg',
    bio: '提供技术环境搭建和问题解决支持，确保学员能够专注于学习核心内容。',
    experience: '4年技术支持经验',
    specialties: ['环境配置', '故障排除', '网络管理', '硬件维护'],
    education: '佛山科技学院计算机科学学士',
    personalInterests: ['电子产品', '游戏', '篮球'],
    contactEmail: 'sun.jishu@wanxing-ai.com',
    officeHours: '周一至周五 8:30-17:30'
  }
];