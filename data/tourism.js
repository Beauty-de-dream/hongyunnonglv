/**
 * 乡村旅游数据
 * 包含旅游向导信息
 */

const tourismData = {
  // 旅游向导
  guides: [
    {
      id: 1,
      name: "吴乡导",
      avatar: "/images/avatar1.jpg",
      specialty: "苗寨深度游 · 农耕文化体验",
      experience: "6",
      rating: 4.9,
      ratingCount: 156,
      price: "180元/天",
      intro:
        "土生土长的苗族向导，熟悉苗寨文化和农耕风俗，可带领游客深度体验苗族原生态生活。",
      tags: ["苗族文化", "农耕体验", "摸鱼捉虾", "苗家美食"],
      available: true,
    },
    {
      id: 2,
      name: "石山妹",
      avatar: "/images/avatar2.jpg",
      specialty: "乡村美食 · 非遗技艺体验",
      experience: "4",
      rating: 4.8,
      ratingCount: 88,
      price: "150元/天",
      intro:
        "热情好客的苗族姑娘，擅长介绍当地美食文化和非遗技艺体验，讲解生动有趣，广受好评。",
      tags: ["苗族美食", "非遗体验", "刺绣学习", "芦笙文化"],
      available: true,
    },
    {
      id: 3,
      name: "龙大叔",
      avatar: "/images/avatar3.jpg",
      specialty: "山野探险 · 传统农事文化",
      experience: "10",
      rating: 5.0,
      ratingCount: 234,
      price: "200元/天",
      intro:
        "经验丰富的资深向导，对湘西山野地形了如指掌，带您走遍最美的苗寨秘境，体验最地道的农耕生活。",
      tags: ["山野徒步", "溯溪探险", "野生植物", "传统农具"],
      available: true,
    },
  ],
};

module.exports = tourismData;
