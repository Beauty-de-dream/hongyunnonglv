/**
 * 特色民宿数据
 * 包含平台上的民宿信息
 */

const minsuSpotsData = [
  {
    id: 1,
    name: "边城故事·吊脚楼民宿",
    location: "湖南省湘西州凤凰县",
    price: "328元/晚",
    priceNum: 328,
    image: "/images/minsu-fenghuang.jpg",
    description:
      "坐落于沱江之畔的百年吊脚楼改造民宿，推窗即见沱江碧水与苗寨风情。配套稻田农场，体验原汁原味的湘西农耕生活。",
    features: ["沱江美景", "苗族文化", "含早餐"],
    farmExperiences: [
      { name: "稻田摸鱼体验", icon: "🐟", duration: "1.5小时" },
      { name: "苗家酸萝卜制作", icon: "🥒", duration: "2小时" },
      { name: "苗族蜡染手工", icon: "🎨", duration: "2小时" },
    ],
    rooms: 8,
    phone: "0743-3222888",
    address: "湖南省湘西州凤凰县沱江镇沿江路18号",
  },
  {
    id: 2,
    name: "稻花香里·德夯苗寨民宿",
    location: "湖南省湘西州吉首市",
    price: "268元/晚",
    priceNum: 268,
    image: "/images/minsu-dehang.jpg",
    description:
      "隐于德夯大峡谷的苗族风情民宿，白墙青瓦，群山环绕。可体验插秧、打谷等传统苗家农耕文化，感受湘西山水田园。",
    features: ["峡谷风光", "农耕体验", "苗族歌舞"],
    farmExperiences: [
      { name: "梯田插秧体验", icon: "🌾", duration: "2小时" },
      { name: "苗家腊肉熏制", icon: "🥓", duration: "2小时" },
      { name: "高山蔬菜采摘", icon: "🥬", duration: "1.5小时" },
    ],
    rooms: 6,
    phone: "0743-8222666",
    address: "湖南省湘西州吉首市矮寨镇德夯村66号",
  },
  {
    id: 3,
    name: "芙蓉镇·土家风情院",
    location: "湖南省湘西州永顺县",
    price: "358元/晚",
    priceNum: 358,
    image: "/images/minsu-furongjhen.jpg",
    description:
      "挂在瀑布上的千年古镇民宿，土家族建筑风格，古朴雅致。配套茶园和果园，亲手采摘猕猴桃和制作湘西特色小吃。",
    features: ["瀑布古镇", "土家文化", "茶园果园"],
    farmExperiences: [
      { name: "猕猴桃采摘", icon: "🥝", duration: "2小时" },
      { name: "莓茶采制体验", icon: "🍵", duration: "2小时" },
      { name: "土家糍粑制作", icon: "🍡", duration: "1.5小时" },
    ],
    rooms: 10,
    phone: "0743-5222999",
    address: "湖南省湘西州永顺县芙蓉镇瀑布街99号",
  },
  {
    id: 4,
    name: "云上苗寨·十八洞村民宿",
    location: "湖南省湘西州花垣县",
    price: "238元/晚",
    priceNum: 238,
    image: "/images/minsu-shibadong.jpg",
    description:
      "精准扶贫首倡地十八洞村的特色苗族民宿，云雾缭绕，溪水潺潺。体验苗绣、养蜂等特色产业，感受乡村振兴新面貌。",
    features: ["红色研学", "苗绣体验", "蜂蜜基地"],
    farmExperiences: [
      { name: "苗绣手工体验", icon: "🧵", duration: "2小时" },
      { name: "养蜂采蜜体验", icon: "🐝", duration: "1.5小时" },
      { name: "苗家酸汤制作", icon: "🍲", duration: "2小时" },
    ],
    rooms: 8,
    phone: "0743-7222555",
    address: "湖南省湘西州花垣县双龙镇十八洞村",
  },
];

module.exports = minsuSpotsData;
