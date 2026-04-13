/**
 * 红色文化数据
 * 包含红色故事、红色遗址、红色导游、用户评论等
 */

const redCultureData = {
  // 红色故事
  stories: [
    {
      id: 1,
      title: "十八洞村的振兴之路",
      date: "2024-05-20",
      category: "精准扶贫",
      summary:
        '习近平总书记在此首次提出"精准扶贫"重要思想，走出了一条可复制、可推广的乡村振兴之路。',
      image: "/images/minsu-shibadong.jpg",
      readCount: 1280,
      fullContent:
        '2013年11月，习近平总书记来到湖南省花垣县十八洞村考察，首次提出"精准扶贫"重要思想。十八洞村位于武陵山区腹地，曾是贫困的苗族村寨，通过精准扶贫战略，如今已成为乡村振兴的样板，村民人均年收入从2013年的1668元增至2023年的25000余元。',
    },
    {
      id: 2,
      title: "红军长征在湘西的足迹",
      date: "2024-04-15",
      category: "党史教育",
      summary:
        "1935年，红军途经湘西，播下了革命火种，留下了感人至深的历史故事。",
      image: "/images/minsu-dehang.jpg",
      readCount: 987,
      fullContent:
        "1935年，中国工农红军二六军团在贺龙、萧克率领下转战湘西，途经凤凰、花垣、吉首等地。红军纪律严明，秋毫无犯，为当地百姓播下了革命的种子，留下了许多可歌可泣的英雄故事，至今仍被湘西人民深切缅怀。",
    },
    {
      id: 3,
      title: "湘西革命英雄：贺龙元帅的故乡",
      date: "2024-03-10",
      category: "革命先烈",
      summary: "贺龙元帅是湘西桑植人，他的革命精神激励着一代又一代湘西儿女。",
      image: "/images/minsu-fenghuang.jpg",
      readCount: 756,
      fullContent:
        "贺龙元帅（1896-1969），湖南桑植人，中国人民解放军的创始人之一。他在湘西领导了著名的南昌起义，并长期在湘西、鄂西地区开展武装斗争，建立了湘鄂西革命根据地，为中国革命作出了不可磨灭的贡献。",
    },
    {
      id: 4,
      title: "凤凰古城：百年历史的红色见证",
      date: "2024-02-28",
      category: "红色遗址",
      summary: "凤凰古城不仅是文化名城，也是湘西近代革命的重要发源地之一。",
      image: "/images/minsu-furongjhen.jpg",
      readCount: 1102,
      fullContent:
        "凤凰古城建于清康熙年间，这里孕育了沈从文等文化名人，也是湘西近代革命运动的重要据点。城中留存有大量革命历史遗址，记录了湘西人民在中国共产党领导下英勇抗争、走向解放的光辉历程。",
    },
  ],

  // 红色遗址
  sites: [
    {
      id: 1,
      name: "十八洞村精准扶贫纪念馆",
      location: "湖南省花垣县双龙镇",
      address: "花垣县双龙镇十八洞村村委会旁",
      description:
        '全国精准扶贫示范地，习近平总书记曾在此提出"精准扶贫"重要思想。馆内陈列丰富的图文资料和实物展品，真实记录了十八洞村从贫困到振兴的感人历程。',
      image: "/images/minsu-shibadong.jpg",
      openTime: "09:00 - 17:00（周一闭馆）",
      price: "免费",
      checked: 234,
    },
    {
      id: 2,
      name: "湘西革命历史纪念馆",
      location: "湖南省吉首市",
      address: "吉首市人民路革命纪念园内",
      description:
        "系统展示湘西地区革命历史，收藏了大量珍贵历史文物和革命文献，是湖南省爱国主义教育的重要示范基地。",
      image: "/images/minsu-dehang.jpg",
      openTime: "08:30 - 17:30",
      price: "免费",
      checked: 189,
    },
    {
      id: 3,
      name: "贺龙故居",
      location: "湖南省张家界市桑植县",
      address: "桑植县洪家关白族乡贺龙村",
      description:
        "全国重点文物保护单位，贺龙元帅出生和成长的地方。故居内完整保留了贺龙早年生活的历史环境，是缅怀革命先辈、开展党史教育的重要场所。",
      image: "/images/minsu-fenghuang.jpg",
      openTime: "全天开放",
      price: "免费",
      checked: 312,
    },
  ],

  // 红色导游
  guides: [
    {
      id: 1,
      name: "杨明志",
      avatar: "/images/avatar1.jpg",
      specialty: "湘西革命史 · 十八洞村精准扶贫",
      experience: "8",
      rating: 4.9,
      ratingCount: 128,
      price: "免费",
      intro:
        "历史学专业，深耕湘西红色文化研究15年，曾参与多部地方党史编著工作，讲解生动详实。",
      available: true,
    },
    {
      id: 2,
      name: "田秀英",
      avatar: "/images/avatar2.jpg",
      specialty: "精准扶贫 · 乡村振兴历程",
      experience: "5",
      rating: 4.8,
      ratingCount: 96,
      price: "免费",
      intro:
        "前十八洞村党支部书记助理，亲历扶贫历程，讲解真实感人，深受游客好评。",
      available: true,
    },
    {
      id: 3,
      name: "龙云山",
      avatar: "/images/avatar3.jpg",
      specialty: "贺龙故居 · 湘西革命武装斗争史",
      experience: "12",
      rating: 4.9,
      ratingCount: 203,
      price: "免费",
      intro:
        "国家一级导游，湘西文史研究员，对湘西近代革命历史了如指掌，曾获省级优秀讲解员称号。",
      available: false,
    },
  ],

  // 用户评论
  comments: [
    {
      id: 1,
      author: "王大山",
      content:
        "参观十八洞村后深受感动，精准扶贫的故事让人热泪盈眶，深刻感受到了党的伟大力量！",
      date: "2024-06-20",
      likes: 45,
    },
    {
      id: 2,
      author: "李秀花",
      content:
        "讲解员讲得特别好，把历史讲活了。孩子们听得格外认真，这种红色教育意义深远。",
      date: "2024-06-18",
      likes: 32,
    },
    {
      id: 3,
      author: "张建国",
      content:
        "革命先辈的艰辛奋斗令人敬仰，我们要不忘初心，继续前行，把美丽乡村建设得更好！",
      date: "2024-06-15",
      likes: 67,
    },
  ],
};

module.exports = redCultureData;
