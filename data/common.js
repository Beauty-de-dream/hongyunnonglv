/**
 * 通用数据
 * 包含用户评价、平台统计等
 */

const commonData = {
  // 用户评价
  testimonials: [
    {
      name: "张大爷",
      age: 65,
      role: "务工人员",
      content: "通过平台找到了合适的工作，既锻炼了身体，又有了收入，很满意！",
      rating: 5,
      avatar: "/images/avatar1.jpg",
    },
    {
      name: "李农户",
      age: 50,
      role: "农机租户",
      content: "租到了质量很好的收割机，价格公道，节省了很多成本。",
      rating: 5,
      avatar: "/images/avatar2.jpg",
    },
    {
      name: "王女士",
      age: 35,
      role: "游客",
      content: "带孩子来采摘，体验很棒，孩子玩得很开心，还学到了农业知识。",
      rating: 4,
      avatar: "/images/avatar3.jpg",
    },
  ],

  // 平台统计数据
  stats: {
    machineryCount: 1268,
    workerCount: 856,
    gardenCount: 342,
    satisfaction: 95,
  },
};

module.exports = commonData;
