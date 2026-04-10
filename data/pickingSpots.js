/**
 * 采摘点数据
 * 包含平台上的采摘园信息
 */

const pickingSpotsData = [
  {
    id: 1,
    name: "春天草莓园",
    location: "北京市昌平区",
    latitude: 40.2208,
    longitude: 116.2313,
    price: "80元/人",
    priceNum: 80,
    season: "12月-5月",
    features: ["有机种植", "亲子友好", "现摘现吃"],
    image: "/images/strawberry.jpg",
    description:
      "北京最大的草莓采摘基地，品种丰富，采用有机种植方式，口感香甜。园区设施完善，配有儿童游乐区、休息区和停车场。",
    phone: "010-12345678",
    address: "北京市昌平区南口镇草莓大道18号",
  },
  {
    id: 2,
    name: "阳光樱桃园",
    location: "山东省烟台市",
    latitude: 37.4638,
    longitude: 121.4479,
    price: "60元/人",
    priceNum: 60,
    season: "5月-7月",
    features: ["山地樱桃", "风景优美", "农家乐"],
    image: "/images/cherry.jpg",
    description:
      "烟台大樱桃原产地，品质优良。坐落在山坡上，空气清新，风景如画。园区提供农家乐服务，可品尝地道农家菜。",
    phone: "0535-12345678",
    address: "山东省烟台市福山区樱桃路66号",
  },
  {
    id: 3,
    name: "田园苹果庄园",
    location: "陕西省咸阳市",
    latitude: 34.3296,
    longitude: 108.7093,
    price: "45元/人",
    priceNum: 45,
    season: "9月-11月",
    features: ["红富士", "无公害", "包装带走"],
    image: "/images/apple.png",
    description:
      "陕西优质苹果，香甜脆嫩。采用绿色无公害种植技术，果园提供免费包装袋，采摘的水果可带走。",
    phone: "029-12345678",
    address: "陕西省咸阳市礼泉县苹果大道99号",
  },
  {
    id: 4,
    name: "蓝天葡萄庄园",
    location: "河北省张家口市",
    latitude: 40.8119,
    longitude: 115.517,
    price: "55元/人",
    priceNum: 55,
    season: "8月-10月",
    features: ["多品种", "亲子体验", "农家餐"],
    image: "/images/grape.jpg",
    description:
      "拥有十余种葡萄品种，从巨峰到阳光玫瑰应有尽有。园区提供亲子体验活动和正宗农家餐。",
    phone: "0313-12345678",
    address: "河北省张家口市怀来县葡萄大道8号",
  },
];

module.exports = pickingSpotsData;
