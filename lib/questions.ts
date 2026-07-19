export interface QuestionItem {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  dimension: string;
}

export const questionSets: Record<string, { name: string; description: string; modes: Record<string, { label: string; count: number }>; questions: QuestionItem[] }> = {
  "friendship": {
    name: "闺蜜版 · 深度了解",
    description: "测测你对她的了解有多深——从情绪风格到相处秘密，全方位验证你的判断",
    modes: {
      easy: { label: "少 · 快速试水", count: 10 },
      medium: { label: "中 · 标准了解", count: 20 },
      deep: { label: "多 · 全面挑战", count: 35 },
    },
    questions: [
      // === 维度一：情绪与压力应对 (6题) ===
      {
        id: "e1",
        text: "当好朋友遇到很大的压力时，她通常的第一反应是什么？",
        optionA: "自己消化，不想让别人知道",
        optionB: "马上跟信得过的人吐槽倾诉",
        optionC: "用吃东西、刷剧、玩游戏转移注意力",
        optionD: "焦虑不安，反复想这件事",
        dimension: "情绪与压力",
      },
      {
        id: "e2",
        text: "她情绪恢复的速度大概是什么样子？",
        optionA: "很快，睡一觉就好了",
        optionB: "需要几天时间慢慢消化",
        optionC: "表面看起来好了，但其实心里还在意",
        optionD: "需要别人拉她一把才能走出情绪",
        dimension: "情绪与压力",
      },
      {
        id: "e3",
        text: "她最讨厌别人在她情绪不好的时候做什么？",
        optionA: "一直追问「你怎么了」",
        optionB: "给一堆建议和解决方案",
        optionC: "完全不闻不问",
        optionD: "拿她的情绪开玩笑",
        dimension: "情绪与压力",
      },
      {
        id: "e4",
        text: "她更容易因为什么而情绪低落？",
        optionA: "人际关系中的矛盾或冷落",
        optionB: "工作/学业上的挫败",
        optionC: "对未来感到迷茫",
        optionD: "身体疲惫积累",
        dimension: "情绪与压力",
      },
      {
        id: "e5",
        text: "她在朋友面前哭过的次数多吗？",
        optionA: "挺多的，她不在意在好朋友面前哭",
        optionB: "偶尔，真的很触动才会",
        optionC: "很少，她不太会当着人面哭",
        optionD: "几乎不，她不喜欢展露脆弱",
        dimension: "情绪与压力",
      },
      {
        id: "e6",
        text: "如果她最好的朋友突然疏远她，她会怎么做？",
        optionA: "直接问对方怎么了",
        optionB: "反思自己做错了什么，但不敢问",
        optionC: "也保持距离，等对方来找自己",
        optionD: "告诉自己无所谓，但心里很难过",
        dimension: "情绪与压力",
      },
      // === 维度二：社交能量与人际风格 (6题) ===
      {
        id: "s1",
        text: "她社交一圈下来之后，通常的感觉是什么？",
        optionA: "充满电，越玩越兴奋",
        optionB: "很开心但结束后需要独处充电",
        optionC: "人多的时候还好，但太久会累",
        optionD: "很少主动去社交，除非被拉去",
        dimension: "社交与人际",
      },
      {
        id: "s2",
        text: "在一群朋友聚会中，她通常扮演什么角色？",
        optionA: "活跃气氛、带节奏的那个",
        optionB: "安静倾听、偶尔接话的那个",
        optionC: "跟几个人小范围聊得火热",
        optionD: "负责组织和张罗的那个",
        dimension: "社交与人际",
      },
      {
        id: "s3",
        text: "她怎么看待「突然的联系」？",
        optionA: "很喜欢朋友突然找她聊天或约她",
        optionB: "看心情，有时候觉得惊喜有时候觉得打扰",
        optionC: "更喜欢提前约好，不喜欢突然袭击",
        optionD: "她自己也经常突然找人",
        dimension: "社交与人际",
      },
      {
        id: "s4",
        text: "她交新朋友的速度如何？",
        optionA: "很容易跟人熟起来，认识不久就聊开了",
        optionB: "需要一段时间才能放松做自己",
        optionC: "对大部分人保持礼貌距离，极少深入",
        optionD: "很挑人，看对眼了可以很快",
        dimension: "社交与人际",
      },
      {
        id: "s5",
        text: "她更倾向于一对一深聊还是一群人热闹？",
        optionA: "一对一的深度聊天最能让她满足",
        optionB: "一群人的热闹氛围让她开心",
        optionC: "看心情，两种都需要",
        optionD: "都不太喜欢，她更喜欢自己待着",
        dimension: "社交与人际",
      },
      {
        id: "s6",
        text: "如果朋友约她去一个全是陌生人的场合，她会怎么反应？",
        optionA: "兴奋，认识新朋友多有意思",
        optionB: "有点紧张，但如果朋友在身边就好",
        optionC: "不太想去，觉得很消耗",
        optionD: "会去但全程跟在朋友旁边不主动说话",
        dimension: "社交与人际",
      },
      // === 维度三：冲突与分歧处理 (6题) ===
      {
        id: "c1",
        text: "跟好朋友吵架后，她通常会怎么做？",
        optionA: "先冷静一会儿，然后主动沟通",
        optionB: "等对方来找她",
        optionC: "假装没发生过，慢慢恢复关系",
        optionD: "会发消息或写信表达自己的想法",
        dimension: "冲突与分歧",
      },
      {
        id: "c2",
        text: "她更倾向于怎么表达不满？",
        optionA: "直接说出来",
        optionB: "用情绪和态度暗示",
        optionC: "憋着不说，但行为上会疏远",
        optionD: "用开玩笑的方式表达",
        dimension: "冲突与分歧",
      },
      {
        id: "c3",
        text: "她认为朋友之间吵架是坏事吗？",
        optionA: "是，她会尽量避免冲突",
        optionB: "不是，她觉得吵开反而更好",
        optionC: "看情况，有些架值得吵有些不值得",
        optionD: "她无所谓，吵就吵了",
        dimension: "冲突与分歧",
      },
      {
        id: "c4",
        text: "如果她觉得朋友做了一件让她受伤的事，她会怎么做？",
        optionA: "直接告诉对方「你这样做让我很难受」",
        optionB: "给对方找理由，自我消化",
        optionC: "以后在这件事上不再信任对方，但不说",
        optionD: "以同样的方式回敬对方让ta感受一下",
        dimension: "冲突与分歧",
      },
      {
        id: "c5",
        text: "朋友之间的冷战，她能撑多久？",
        optionA: "撑不过一天，她会主动破冰",
        optionB: "几天吧，再久就受不了了",
        optionC: "你不找我我也可以不找你，看谁撑得久",
        optionD: "她几乎不冷战，有问题当场解决",
        dimension: "冲突与分歧",
      },
      {
        id: "c6",
        text: "如果她的朋友跟她讨厌的人走得很近，她会？",
        optionA: "直接跟朋友说自己的感受",
        optionB: "心里不太舒服但不会干涉朋友的选择",
        optionC: "慢慢疏远这个朋友",
        optionD: "无所谓，朋友的朋友跟自己没关系",
        dimension: "冲突与分歧",
      },
      // === 维度四：亲密表达与关系期待 (6题) ===
      {
        id: "r1",
        text: "她怎么表达对好朋友的在乎？",
        optionA: "经常主动找对方聊天",
        optionB: "默默记住对方的小事和喜好",
        optionC: "用送小礼物或请吃饭的方式",
        optionD: "在对方需要的时候及时出现",
        dimension: "亲密与期待",
      },
      {
        id: "r2",
        text: "她希望好朋友多久联系一次？",
        optionA: "每天都联系",
        optionB: "隔几天聊一次就好",
        optionC: "不需要固定频率，有心就好",
        optionD: "即使很久不联系，见面也跟以前一样",
        dimension: "亲密与期待",
      },
      {
        id: "r3",
        text: "她最受不了好朋友做什么？",
        optionA: "放鸽子或临时变卦",
        optionB: "说话阴阳怪气不直接说",
        optionC: "对她的生活指手画脚",
        optionD: "答应的事转头就忘",
        dimension: "亲密与期待",
      },
      {
        id: "r4",
        text: "如果她需要帮助，她开口的难易程度是怎样的？",
        optionA: "很直接，好朋友就是用来麻烦的",
        optionB: "犹豫一下但最终还是能开口",
        optionC: "除非万不得已，不然不麻烦别人",
        optionD: "她宁愿自己扛也不想开口",
        dimension: "亲密与期待",
      },
      {
        id: "r5",
        text: "她怎么看待「负能量」分享？",
        optionA: "好朋友之间就应该无话不谈，她喜欢这种信任感",
        optionB: "可以倾诉，但不要一直输出负能量",
        optionC: "她更倾向于互相带来快乐，不是情绪的垃圾桶",
        optionD: "她自己也经常负能量输出",
        dimension: "亲密与期待",
      },
      {
        id: "r6",
        text: "她认为好朋友之间最不能触碰的底线是什么？",
        optionA: "背叛和欺骗",
        optionB: "在背后说自己坏话",
        optionC: "拿自己的隐私当谈资",
        optionD: "在自己最需要的时候不在",
        dimension: "亲密与期待",
      },
      // === 维度五：价值观与底线 (6题) ===
      {
        id: "v1",
        text: "她最看重朋友身上的什么品质？",
        optionA: "真诚和信任",
        optionB: "温柔和体贴",
        optionC: "幽默和有趣",
        optionD: "靠谱和担当",
        dimension: "价值观与底线",
      },
      {
        id: "v2",
        text: "她对「朋友之间的秘密」的态度是？",
        optionA: "绝对守口如瓶，即使是别人问她也不会说",
        optionB: "不会主动说，但被问到了会模糊带过",
        optionC: "跟另一个更亲密的朋友说也没关系",
        optionD: "她认为真正的好朋友之间不应该有秘密",
        dimension: "价值观与底线",
      },
      {
        id: "v3",
        text: "她会因为哪一类事情对朋友失望？",
        optionA: "关键时刻找不到人",
        optionB: "发现对方变得跟自己不一样",
        optionC: "对方有了新朋友而冷落自己",
        optionD: "对方变得虚荣或变得自己不认识的样子",
        dimension: "价值观与底线",
      },
      {
        id: "v4",
        text: "她认为朋友之间应该有多坦诚？",
        optionA: "100%坦诚，好朋友之间不需要伪装",
        optionB: "大部分坦诚，但有些善意谎言可以接受",
        optionC: "看事情，触及隐私的话可以不分享",
        optionD: "以不伤害对方感受为前提，适当美化也可以",
        dimension: "价值观与底线",
      },
      {
        id: "v5",
        text: "如果她的好朋友突然变得很成功/很受欢迎，她会怎么想？",
        optionA: "真心为对方高兴",
        optionB: "有点羡慕但也为她开心",
        optionC: "担心对方会变",
        optionD: "希望自己也能赶上",
        dimension: "价值观与底线",
      },
      {
        id: "v6",
        text: "她最不能接受朋友在哪方面跟她完全相反？",
        optionA: "基本道德观念和是非判断",
        optionB: "金钱观和消费习惯",
        optionC: "对待感情的态度",
        optionD: "人生追求的优先级",
        dimension: "价值观与底线",
      },
      // === 维度六：趣味偏好 (5题) ===
      {
        id: "h1",
        text: "如果周末可以完全由她支配，她最可能做什么？",
        optionA: "出去探店/逛街/看展",
        optionB: "在家躺着刷手机看剧",
        optionC: "约朋友出来聚",
        optionD: "做点运动或户外活动",
        dimension: "趣味偏好",
      },
      {
        id: "h2",
        text: "她出门前一般提前多久准备？",
        optionA: "提前很久，精心打扮",
        optionB: "差不多准时，迅速搞定",
        optionC: "经常迟到，总在最后一刻忙乱",
        optionD: "看场合，重要的提前准备日常随意",
        dimension: "趣味偏好",
      },
      {
        id: "h3",
        text: "她最可能在什么情况下秒回消息？",
        optionA: "任何时候看到就回",
        optionB: "等消息的时候会秒回",
        optionC: "看心情",
        optionD: "几乎不秒回，看到了也要等一下再回",
        dimension: "趣味偏好",
      },
      {
        id: "h4",
        text: "她的人生目标是更偏向哪一种？",
        optionA: "安稳舒适，快乐就好",
        optionB: "有挑战有成就，不断往上走",
        optionC: "自由自在，不被束缚",
        optionD: "建立深度关系，有爱的人在身边",
        dimension: "趣味偏好",
      },
      {
        id: "h5",
        text: "三个人一起玩的时候，她最可能是？",
        optionA: "平衡者，两边都聊到",
        optionB: "跟其中一个人聊得比较多",
        optionC: "觉得三个人有点尴尬，更喜欢一对一",
        optionD: "掌控话题走向的那个",
        dimension: "趣味偏好",
      },
    ],
  },
};

export function getQuestionsForMode(setId: string, mode: string) {
  const set = questionSets[setId];
  if (!set) return [];
  const count = set.modes[mode]?.count ?? 10;
  return set.questions.slice(0, count);
}

export function getDimensionSummary(questions: QuestionItem[]) {
  const map: Record<string, number> = {};
  questions.forEach((q) => {
    map[q.dimension] = (map[q.dimension] || 0) + 1;
  });
  return map;
}
