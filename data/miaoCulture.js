/**
 * 苗族文化数据
 * 包含苗族文化介绍、节日、非遗技艺等
 */

const miaoCultureData = {
  // 苗族文化介绍
  cultures: [
    {
      id: 1,
      name: "苗族服饰",
      icon: "👘",
      color: "#AD1457",
      bgColor: "#FCE4EC",
      description:
        '苗族服饰是苗族文化的重要载体，以精美刺绣、银饰点缀为特色，分支系众多，风格各异，被誉为"穿在身上的史书"，蕴含着苗族数千年的历史与文化记忆。',
      features: ["蜡染工艺", "手工刺绣", "银饰点缀", "色彩绚丽"],
    },
    {
      id: 2,
      name: "苗族银饰",
      icon: "💎",
      color: "#37474F",
      bgColor: "#ECEFF1",
      description:
        '苗族银饰是最具代表性的非物质文化遗产之一，以银泡、银角、银链、银铃为主要形式，纯手工锻造，工艺精湛，寓意吉祥，素有"以银为美"之说。',
      features: ["纯手工锻造", "图案精美", "寓意吉祥", "世代相传"],
    },
    {
      id: 3,
      name: "苗族刺绣",
      icon: "🎨",
      color: "#6A1B9A",
      bgColor: "#F3E5F5",
      description:
        '苗绣是苗族文化的"活化石"，通过针线将苗族的神话、历史、图腾等文化记录下来，针法多达数十种，2006年被列入国家非物质文化遗产名录。',
      features: ["国家非遗", "图腾文化", "针法多样", "历史记录"],
    },
    {
      id: 4,
      name: "芦笙文化",
      icon: "🎵",
      color: "#2E7D32",
      bgColor: "#E8F5E9",
      description:
        "芦笙是苗族最具代表性的乐器，芦笙节是苗族最盛大的传统节日之一。芦笙舞是苗族重要的文化表达方式，集乐器演奏与舞蹈于一体，气势恢宏。",
      features: ["传统乐器", "节庆必备", "集体舞蹈", "文化传承"],
    },
  ],

  // 苗族节日
  festivals: [
    {
      id: 1,
      name: "苗年节",
      date: "2024-11-25",
      daysLeft: 152,
      location: "湖南省花垣县、凤凰县各苗寨",
      description:
        '苗族传统新年，又称"苗历新年"，是苗族最隆重的节日。届时苗民穿盛装、跳芦笙舞、赶苗年集，热闹非凡，是体验苗族文化的最佳时机。',
      activities: ["芦笙舞表演", "苗族服饰展示", "传统美食品尝", "打糍粑"],
      icon: "🎊",
    },
    {
      id: 2,
      name: "姊妹节",
      date: "2024-04-18",
      daysLeft: -65,
      location: "贵州省台江县施洞镇",
      description:
        '苗族女性的专属节日，被誉为"苗族情人节"。节日期间苗族女性穿盛装、吃姊妹饭、跳芦笙舞，展现苗族女性的美丽与智慧，是苗族最富特色的节庆之一。',
      activities: ["姊妹饭", "芦笙舞", "苗族歌谣对唱", "银饰展示"],
      icon: "💃",
    },
    {
      id: 3,
      name: "苗族芦笙节",
      date: "2024-10-12",
      daysLeft: 108,
      location: "湖南省吉首市矮寨",
      description:
        "以芦笙表演为主题的民俗节日，各村寨芦笙队展开技艺比拼，芦笙声响彻山谷，展示苗族音乐文化的精华，吸引大批游客和摄影爱好者慕名而来。",
      activities: ["芦笙比赛", "歌舞汇演", "苗族手工艺展览", "民俗体验"],
      icon: "🎶",
    },
  ],

  // 非遗技艺
  arts: [
    {
      id: 1,
      name: "苗绣技艺",
      artisan: "石美英",
      age: 62,
      level: "省级非遗传承人",
      description:
        "从事苗绣创作42年，精通数十种针法，作品曾参加全国非遗展览并获奖。",
      image: "/images/avatar2.jpg",
      videoTitle: "苗绣——针线间的史书",
    },
    {
      id: 2,
      name: "苗银锻造",
      artisan: "龙德山",
      age: 55,
      level: "国家级非遗传承人",
      description:
        "家传银饰锻造技艺第五代传人，作品工艺精湛，远销全国各地及海外。",
      image: "/images/avatar1.jpg",
      videoTitle: "苗银银角——火与银的艺术",
    },
    {
      id: 3,
      name: "蜡染工艺",
      artisan: "吴花香",
      age: 48,
      level: "县级非遗传承人",
      description:
        "蜡染图案设计富有创新，将传统纹样与现代审美结合，作品深受市场欢迎。",
      image: "/images/avatar3.jpg",
      videoTitle: "蜡染——蓝与白的诗意",
    },
  ],
};

module.exports = miaoCultureData;
