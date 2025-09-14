// AI服务 - 课程推荐系统
import type { AssessmentData, CourseRecommendation } from '@/types'

export type { AssessmentData, CourseRecommendation }

const AI_CONFIG = {
  apiKey: 'sk-GIyDrwnVzr8b4RzDuG2j03XOVJKYIbVBdwJ4o6AgPlxbAPgS',
  baseUrl: 'https://www.dmxapi.com/v1',
  model: 'gpt-4.1-mini'
}

// 可用课程数据
const AVAILABLE_COURSES = [
  {
    id: 'ai-media',
    name: 'AI自媒体',
    description: '掌握AI工具进行内容创作，从文案到视频制作全流程',
    difficulty: '初级',
    duration: '6周',
    skills: ['AI文案创作', 'AI图片生成', 'AI视频制作', '自媒体运营', '爆款内容创作', 'AI直播'],
    prerequisites: '无',
    outcomes: ['掌握AI内容创作工具', '能够制作爆款内容', '提升自媒体运营效率', '实现内容变现']
  },
  {
    id: 'ai-prompt',
    name: 'AI提示词',
    description: '深入学习提示词工程，成为AI沟通专家',
    difficulty: '初级',
    duration: '4周',
    skills: ['提示词设计', 'ChatGPT使用', '角色扮演提示词', '任务分解', '模板构建', '多轮对话'],
    prerequisites: '无',
    outcomes: ['精通AI对话技巧', '提高工作效率10倍', '掌握AI工具使用', '成为AI应用专家']
  },
  {
    id: 'ai-office',
    name: 'AI办公提效',
    description: '利用AI工具提升办公效率，自动化日常工作',
    difficulty: '中级',
    duration: '5周',
    skills: ['Excel AI插件', 'PPT智能生成', '邮件自动化', 'AI转写', '数据分析', '流程优化'],
    prerequisites: '基础办公软件使用',
    outcomes: ['办公效率提升5倍', '自动化重复工作', '智能数据分析', '成为职场AI专家']
  },
  {
    id: 'ai-programming',
    name: 'AI编程',
    description: '学会用AI辅助编程，提升开发效率和代码质量',
    difficulty: '高级',
    duration: '8周',
    skills: ['GitHub Copilot', 'AI代码生成', '智能代码审查', '自动化测试', 'AI调试', '架构设计'],
    prerequisites: '编程基础',
    outcomes: ['编程效率提升3倍', '代码质量显著提高', '掌握AI开发工具', '成为AI时代程序员']
  }
]

export class AIService {
  private static instance: AIService
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  async getCourseRecommendation(assessmentData: AssessmentData): Promise<CourseRecommendation[]> {
    try {
      const prompt = this.buildPrompt(assessmentData)
      
      const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          messages: [
            {
              role: 'system',
              content: '你是万星AI的专业课程顾问，专门为学员推荐最适合的AI课程。请根据学员的背景和需求，从给定的课程中选择最适合的1-2门课程，并详细说明推荐理由和学习收获。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`AI API request failed: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // 解析AI响应并返回结构化数据
      return this.parseAIResponse(aiResponse, assessmentData)
      
    } catch (error) {
      console.error('AI service error:', error)
      // 如果AI服务失败，返回基于规则的推荐
      return this.getFallbackRecommendation(assessmentData)
    }
  }

  private buildPrompt(data: AssessmentData): string {
    const coursesInfo = AVAILABLE_COURSES.map(course => 
      `- ${course.name} (${course.id}): ${course.description}, 难度: ${course.difficulty}, 时长: ${course.duration}, 技能: ${course.skills.join(', ')}, 前置要求: ${course.prerequisites}`
    ).join('\n')

    return `
学员信息：
- 姓名：${data.name}
- 年龄：${data.age}
- 教育背景：${data.education}
- 工作经验：${data.experience}
- 兴趣领域：${data.interests.join(', ')}
- 学习目标：${data.goals.join(', ')}
- 可用时间：${data.timeAvailable}
- 学习风格：${data.learningStyle}
- 技术背景：${data.techBackground}
- 职业阶段：${data.careerStage}

可选课程：
${coursesInfo}

请基于学员的背景和需求，推荐1-2门最适合的课程。对于每门推荐的课程，请提供：
1. 课程ID和名称
2. 匹配度评分（1-100）
3. 推荐理由（3-5条）
4. 学习路径建议
5. 预期学习收获（具体且实用）
6. 学习时间估算
7. 后续进阶建议

请以JSON格式返回，格式如下：
{
  "recommendations": [
    {
      "courseId": "课程ID",
      "courseName": "课程名称",
      "matchScore": 85,
      "reasons": ["理由1", "理由2", "理由3"],
      "learningPath": ["步骤1", "步骤2", "步骤3"],
      "expectedOutcomes": ["收获1", "收获2", "收获3"],
      "timeEstimate": "具体时间安排",
      "difficulty": "适合的难度",
      "nextSteps": ["后续建议1", "后续建议2"]
    }
  ]
}
`
  }

  private parseAIResponse(response: string, assessmentData: AssessmentData): CourseRecommendation[] {
    try {
      // 尝试解析JSON响应
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
          return parsed.recommendations.map((rec: any) => ({
            courseId: rec.courseId || '',
            courseName: rec.courseName || '',
            matchScore: rec.matchScore || 80,
            reasons: rec.reasons || [],
            learningPath: rec.learningPath || [],
            expectedOutcomes: rec.expectedOutcomes || [],
            timeEstimate: rec.timeEstimate || '8-12周',
            difficulty: rec.difficulty || '中级',
            nextSteps: rec.nextSteps || []
          }))
        }
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error)
    }

    // 如果解析失败，返回备用推荐
    return this.getFallbackRecommendation(assessmentData)
  }

  private getFallbackRecommendation(data: AssessmentData): CourseRecommendation[] {
    // 基于规则的备用推荐逻辑
    const recommendations: CourseRecommendation[] = []

    // 根据用户兴趣和目标推荐
    if (data.interests.includes('内容创作') || data.interests.includes('自媒体') || data.goals.includes('副业')) {
      recommendations.push({
        courseId: 'ai-media',
        courseName: 'AI自媒体',
        matchScore: 90,
        reasons: [
          '完美匹配您的内容创作兴趣',
          '零基础即可上手，门槛低',
          '实用性强，立即可以变现',
          'AI时代最热门的技能之一'
        ],
        learningPath: [
          '掌握AI文案创作工具',
          '学习AI图片和视频生成',
          '制作第一个爆款内容',
          '建立个人IP和变现体系'
        ],
        expectedOutcomes: [
          '掌握10+AI内容创作工具',
          '能独立制作高质量内容',
          '建立稳定的内容创作流程',
          '实现月入过万的目标'
        ],
        timeEstimate: '每周6-8小时，6周完成',
        difficulty: '初级',
        nextSteps: [
          '深入学习AI提示词技巧',
          '扩展到短视频和直播',
          '建立自己的内容团队'
        ]
      })
    } else if (data.interests.includes('提高效率') || data.careerStage === 'working') {
      recommendations.push({
        courseId: 'ai-office',
        courseName: 'AI办公提效',
        matchScore: 85,
        reasons: [
          '直接提升职场竞争力',
          '适合在职人员学习',
          '学完立即应用到工作中',
          '投资回报率极高'
        ],
        learningPath: [
          '学习Excel AI插件应用',
          '掌握PPT智能生成技巧',
          '设置邮件和会议自动化',
          '构建个人工作AI助手'
        ],
        expectedOutcomes: [
          '工作效率提升300%以上',
          '减少80%重复性工作',
          '成为团队AI应用专家',
          '获得更多晋升机会'
        ],
        timeEstimate: '每周4-6小时，5周完成',
        difficulty: '中级',
        nextSteps: [
          '学习AI提示词进阶技巧',
          '成为公司AI培训师',
          '探索AI创业机会'
        ]
      })
    } else if (data.techBackground === 'none') {
      // 零基础用户推荐AI提示词
      recommendations.push({
        courseId: 'ai-prompt',
        courseName: 'AI提示词',
        matchScore: 88,
        reasons: [
          '最适合AI零基础入门',
          '学会与AI高效沟通',
          '适用于所有行业和岗位',
          '投入少，回报大'
        ],
        learningPath: [
          '理解AI提示词原理',
          '掌握ChatGPT使用技巧',
          '学习角色扮演提示词',
          '构建个人提示词库'
        ],
        expectedOutcomes: [
          '成为AI对话专家',
          '工作效率提升10倍',
          '掌握100+实用提示词',
          '为深入学习AI打基础'
        ],
        timeEstimate: '每周3-5小时，4周完成',
        difficulty: '初级',
        nextSteps: [
          '选择专业方向课程',
          '参与AI社群交流',
          '探索AI应用场景'
        ]
      })
    }

    // 如果是程序员或有编程基础，推荐AI编程
    if (data.techBackground === 'programmer' || data.techBackground === 'advanced-programmer' || data.interests.includes('编程')) {
      recommendations.push({
        courseId: 'ai-programming',
        courseName: 'AI编程',
        matchScore: 92,
        reasons: [
          '专为程序员打造的AI课程',
          '直接提升开发效率',
          '掌握最前沿的编程技术',
          'AI时代程序员必备技能'
        ],
        learningPath: [
          '掌握GitHub Copilot使用',
          '学习AI代码生成技巧',
          '掌握智能代码审查',
          '构建AI辅助开发流程'
        ],
        expectedOutcomes: [
          '编程效率提升300%',
          '代码质量显著提高',
          '掌握AI开发最佳实践',
          '成为团队技术领导者'
        ],
        timeEstimate: '每周8-10小时，8周完成',
        difficulty: '高级',
        nextSteps: [
          '深入研究特定AI领域',
          '参与开源AI项目',
          '成为AI技术专家'
        ]
      })
    }

    // 如果没有推荐，默认推荐AI提示词
    if (recommendations.length === 0) {
      recommendations.push({
        courseId: 'ai-prompt',
        courseName: 'AI提示词',
        matchScore: 80,
        reasons: ['适合所有AI初学者的入门课程'],
        learningPath: ['从基础开始，循序渐进学习AI应用'],
        expectedOutcomes: ['掌握AI基础应用，为深入学习做准备'],
        timeEstimate: '4周',
        difficulty: '初级',
        nextSteps: ['根据兴趣选择专业方向课程']
      })
    }

    return recommendations.slice(0, 2) // 最多返回2个推荐
  }
}

export const aiService = AIService.getInstance()
