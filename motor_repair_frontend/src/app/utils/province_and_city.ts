
export function getShortProvinces() {
  let list = [
    "京","津","冀","晋","蒙",
    "辽","吉","黑","沪","苏",
    "浙","皖","闽","赣","鲁",
    "豫","鄂","湘","粤","桂",
    "琼","川","贵","云","渝",
    "藏","陕","甘","青","宁",
    "新"
  ];
  return list
}

export function getProvinces() {
  let list = [
    {name:"安徽", short: "皖"}, {name:"江苏", short: "苏"}, {name:"浙江", short: "浙"}, 
    {name:"北京", short: "京"}, {name:"天津", short: "津"}, {name:"河北", short: "冀"},
    {name:"山西", short: "晋"}, {name:"内蒙古", short: "蒙"}, {name:"辽宁", short: "辽"},
    {name:"吉林", short: "吉"}, {name:"黑龙江", short: "黑"}, {name:"上海", short: "沪"},
    
    {name:"福建", short: "闽"}, {name:"江西", short: "赣"}, {name:"山东", short: "鲁"},
    {name:"河南", short: "豫"}, {name:"湖北", short: "鄂"}, {name:"湖南", short: "湘"},
    {name:"广东", short: "粤"}, {name:"广西", short: "桂"}, {name:"海南", short: "琼"},
    {name:"四川", short: "川"}, {name:"贵州", short: "贵"}, {name:"云南", short: "云"},
    {name:"重庆", short: "渝"}, {name:"西藏", short: "藏"}, {name:"陕西", short: "陕"},
    {name:"甘肃", short: "甘"}, {name:"青海", short: "青"}, {name:"宁夏", short: "宁"},
    {name:"新疆", short: "新"}
  ];
  return list
}

export function getCities() {
  let list = []
  list['冀'] = [
    {name:"石家庄", short: "A"},
    {name:"唐山", short: "B"},
    {name:"秦皇岛", short: "C"},
    {name:"邯郸", short: "D"},
    {name:"邢台", short: "E"},
    {name:"保定", short: "F"},
    {name:"张家口", short: "G"},
    {name:"承德", short: "H"},
    {name:"沧州", short: "J"},
    {name:"廊坊", short: "R"},
    {name:"衡水", short: "T"}
  ]

  list['皖'] =[
    {name:"合肥", short: "A"},
    {name:"芜湖", short: "B"},
    {name:"蚌埠", short: "C"},
    {name:"淮南", short: "D"},
    {name:"马鞍山", short: "E"},
    {name:"淮北", short: "F"},
    {name:"铜陵", short: "G"},
    {name:"安庆", short: "H"},
    {name:"黄山", short: "J"},
    {name:"滁州", short: "M"},
    {name:"阜阳", short: "K"},
    {name:"宿州", short: "L"},
    {name:"六安", short: "N"},
    {name:"亳州", short: "S"},
    {name:"池州", short: "R"},
    {name:"宣城", short: "P"},
  ]

  list['苏'] =[
    {name:"南京", short: "A"},
    {name:"无锡", short: "B"},
    {name:"徐州", short: "C"},
    {name:"常州", short: "D"},
    {name:"苏州", short: "E"},
    {name:"南通", short: "F"},
    {name:"连云港", short: "G"},
    {name:"淮安", short: "H"},
    {name:"盐城", short: "J"},
    {name:"扬州", short: "K"},
    {name:"镇江", short: "L"},
    {name:"泰州", short: "M"},
    {name:"宿迁", short: "N"},
  ]

  list['浙'] =[
    {name:"杭州", short: "A"},
    {name:"宁波", short: "B"},
    {name:"温州", short: "C"},
    {name:"嘉兴", short: "F"},
    {name:"湖州", short: "E"},
    {name:"绍兴", short: "D"},
    {name:"金华", short: "G"},
    {name:"衢州", short: "H"},
    {name:"舟山", short: "L"},
    {name:"台州", short: "J"},
    {name:"丽水", short: "K"},
  ]

  list['晋'] =[
    {name:"太原", short: "A"},
    {name:"大同", short: "B"},
    {name:"阳泉", short: "C"},
    {name:"长治", short: "D"},
    {name:"晋城", short: "E"},
    {name:"朔州", short: "F"},
    {name:"晋中", short: "K"},
    {name:"运城", short: "M"},
    {name:"忻州", short: "H"},
    {name:"临汾", short: "L"},
    {name:"吕梁", short: "J"},

  ]

  list['蒙'] =[
    {name:"呼和浩特", short: "A"},
    {name:"包头", short: "B"},
    {name:"乌海", short: "C"},
    {name:"赤峰", short: "D"},
    {name:"通辽", short: "G"},
    {name:"鄂尔多斯", short: "K"},
    {name:"呼伦贝尔", short: "E"},
    {name:"巴彦淖尔", short: "L"},
    {name:"乌兰察布", short: "J"},
    {name:"兴安盟", short: "F"},
    {name:"锡林郭勒盟", short: "H"},
    {name:"阿拉善盟", short: "M"},

  ]

  list['辽'] =[
    {name:"沈阳", short: "A"},
    {name:"大连", short: "B"},
    {name:"鞍山", short: "C"},
    {name:"抚顺", short: "D"},
    {name:"本溪", short: "E"},
    {name:"丹东", short: "F"},
    {name:"锦州", short: "G"},
    {name:"营口", short: "H"},
    {name:"阜新", short: "J"},
    {name:"辽阳", short: "K"},
    {name:"盘锦", short: "L"},
    {name:"铁岭", short: "M"},
    {name:"朝阳", short: "N"},
    {name:"葫芦岛", short: "P"},

  ]

  list['吉'] =[
    {name:"长春", short: "A"},
    {name:"吉林", short: "B"},
    {name:"四平", short: "C"},
    {name:"辽源", short: "D"},
    {name:"通化", short: "E"},
    {name:"白山", short: "F"},
    {name:"松原", short: "J"},
    {name:"白城", short: "G"},
    {name:"延边", short: "H"},
  ]

  list['黑'] =[
    {name:"哈尔滨", short: "A"},
    {name:"齐齐哈尔", short: "B"},
    {name:"鸡西", short: "G"},
    {name:"鹤岗", short: "H"},
    {name:"双鸭山", short: "J"},
    {name:"大庆", short: "E"},
    {name:"伊春", short: "F"},
    {name:"佳木斯", short: "D"},
    {name:"七台河", short: "K"},
    {name:"牡丹江", short: "C"},
    {name:"黑河", short: "N"},
    {name:"绥化", short: "M"},
    {name:"大兴安岭", short: "P"},

  ]

  list['闽'] =[
    {name:"福州", short: "A"},
    {name:"厦门", short: "D"},
    {name:"莆田", short: "B"},
    {name:"三明", short: "G"},
    {name:"泉州", short: "C"},
    {name:"漳州", short: "E"},
    {name:"南平", short: "H"},
    {name:"龙岩", short: "F"},
    {name:"宁德", short: "J"},

  ]

  list['赣'] =[
    {name:"南昌", short: "A"},
    {name:"景德镇", short: "H"},
    {name:"萍乡", short: "J"},
    {name:"九江", short: "G"},
    {name:"新余", short: "K"},
    {name:"鹰潭", short: "L"},
    {name:"赣州", short: "B"},
    {name:"吉安", short: "D"},
    {name:"宜春", short: "C"},
    {name:"抚州", short: "F"},
    {name:"上饶", short: "E"},

  ]

  list['鲁'] =[
    {name:"济南", short: "A"},
    {name:"青岛", short: "B"},
    {name:"淄博", short: "C"},
    {name:"枣庄", short: "D"},
    {name:"东营", short: "E"},
    {name:"烟台", short: "F"},
    {name:"潍坊", short: "G"},
    {name:"济宁", short: "H"},
    {name:"泰安", short: "J"},
    {name:"威海", short: "K"},
    {name:"日照", short: "L"},
    {name:"莱芜", short: "S"},
    {name:"临沂", short: "Q"},
    {name:"德州", short: "N"},
    {name:"聊城", short: "P"},
    {name:"滨州", short: "M"},
    {name:"菏泽", short: "R"},

  ]

  list['豫'] =[
    {name:"郑州", short: "A"},
    {name:"开封", short: "B"},
    {name:"洛阳", short: "C"},
    {name:"平顶山", short: "D"},
    {name:"安阳", short: "E"},
    {name:"鹤壁", short: "F"},
    {name:"新乡", short: "G"},
    {name:"焦作", short: "H"},
    {name:"濮阳", short: "J"},
    {name:"许昌", short: "K"},
    {name:"漯河", short: "L"},
    {name:"三门峡", short: "M"},
    {name:"南阳", short: "R"},
    {name:"商丘", short: "N"},
    {name:"信阳", short: "S"},
    {name:"周口", short: "P"},
    {name:"驻马店", short: "Q"},
    {name:"济源", short: "U"},

  ]

  list['鄂'] =[
    {name:"武汉", short: "A"},
    {name:"黄石", short: "B"},
    {name:"十堰", short: "C"},
    {name:"宜昌", short: "E"},
    {name:"襄阳", short: "F"},
    {name:"鄂州", short: "G"},
    {name:"荆门", short: "H"},
    {name:"孝感", short: "K"},
    {name:"荆州", short: "D"},
    {name:"黄冈", short: "J"},
    {name:"咸宁", short: "L"},
    {name:"随州", short: "S"},
    {name:"恩施州", short: "Q"},
    {name:"仙桃", short: "M"},
    {name:"潜江", short: "N"},
    {name:"天门", short: "R"},
    {name:"神农架", short: "P"},

  ]

  list['湘'] =[
    {name:"长沙", short: "A"},
    {name:"株洲", short: "B"},
    {name:"湘潭", short: "C"},
    {name:"衡阳", short: "D"},
    {name:"邵阳", short: "E"},
    {name:"岳阳	", short: "F"},
    {name:"常德", short: "J"},
    {name:"张家界", short: "G"},
    {name:"益阳", short: "H"},
    {name:"郴州", short: "L"},
    {name:"永州", short: "M"},
    {name:"怀化", short: "N"},
    {name:"娄底", short: "K"},
    {name:"湘西州", short: "U"},

  ]

  list['粤'] =[
    {name:"广州", short: "A"},
    {name:"韶关", short: "F"},
    {name:"深圳", short: "B"},
    {name:"珠海", short: "C"},
    {name:"汕头", short: "D"},
    {name:"佛山", short: "E"},
    {name:"江门", short: "J"},
    {name:"湛江", short: "G"},
    {name:"茂名", short: "K"},
    {name:"肇庆", short: "H"},
    {name:"惠州", short: "L"},
    {name:"梅州", short: "M"},
    {name:"汕尾", short: "N"},
    {name:"河源", short: "P"},
    {name:"阳江", short: "Q"},
    {name:"清远", short: "R"},
    {name:"东莞", short: "S"},
    {name:"中山", short: "T"},
    {name:"潮州", short: "U"},
    {name:"揭阳", short: "V"},
    {name:"云浮", short: "W"},

  ]

  list['桂'] =[
    {name:"南宁", short: "A"},
    {name:"柳州", short: "B"},
    {name:"桂林", short: "C"},
    {name:"梧州", short: "D"},
    {name:"北海", short: "E"},
    {name:"防城港", short: "P"},
    {name:"钦州", short: "N"},
    {name:"贵港", short: "R"},
    {name:"玉林", short: "K"},
    {name:"百色", short: "L"},
    {name:"贺州", short: "J"},
    {name:"河池", short: "M"},
    {name:"来宾", short: "G"},
    {name:"崇左", short: "F"},

  ]

  list['琼'] =[
    {name:"海口", short: "A"},
    {name:"三亚", short: "B"},
    {name:"五指山", short: "D"},
    {name:"琼海", short: "C"},

  ]

  list['川'] =[
    {name:"成都", short: "A"},
    {name:"自贡", short: "C"},
    {name:"攀枝花", short: "D"},
    {name:"泸州", short: "E"},
    {name:"德阳", short: "F"},
    {name:"绵阳", short: "B"},
    {name:"广元", short: "H"},
    {name:"遂宁", short: "J"},
    {name:"内江", short: "K"},
    {name:"乐山", short: "L"},
    {name:"南充", short: "R"},
    {name:"眉山", short: "Z"},
    {name:"宜宾", short: "Q"},
    {name:"广安", short: "X"},
    {name:"达州", short: "S"},
    {name:"雅安", short: "T"},
    {name:"巴中", short: "Y"},
    {name:"资阳", short: "M"},
    {name:"阿坝", short: "U"},
    {name:"甘孜", short: "V"},
    {name:"凉山州", short: "W"},

  ]

  list['贵'] =[
    {name:"贵阳", short: "A"},
    {name:"六盘水", short: "B"},
    {name:"遵义", short: "C"},
    {name:"安顺", short: "G"},
    {name:"毕节", short: "F"},
    {name:"铜仁", short: "D"},
    {name:"黔西南州", short: "E"},
    {name:"黔东南州", short: "H"},
    {name:"黔南州", short: "J"},

  ]

  list['云'] =[
    {name:"昆明", short: "A"},
    {name:"曲靖", short: "D"},
    {name:"玉溪", short: "F"},
    {name:"保山", short: "M"},
    {name:"昭通", short: "C"},
    {name:"丽江", short: "P"},
    {name:"普洱", short: "J"},
    {name:"临沧", short: "S"},
    {name:"楚雄州", short: "E"},
    {name:"红河州", short: "G"},
    {name:"文山州", short: "H"},
    {name:"西双版纳州", short: "K"},
    {name:"大理州", short: "L"},
    {name:"德宏州", short: "N"},
    {name:"怒江州	", short: "Q"},
    {name:"迪庆州", short: "R"},

  ]

  list['渝'] =[
    {name:"万州区", short: "F"},
    {name:"涪陵区", short: "G"},
    {name:"江北区", short: "B"},
    {name:"南岸区", short: "A"},
    {name:"黔江区", short: "H"},
    {name:"永川区", short: "C"},

  ]

  list['藏'] =[
    {name:"拉萨", short: "A"},
    {name:"昌都", short: "B"},
    {name:"山南", short: "C"},
    {name:"日喀则", short: "D"},
    {name:"那曲", short: "E"},
    {name:"阿里", short: "F"},
    {name:"林芝", short: "G"},

  ]

  list['陕'] =[
    {name:"西安", short: "A"},
    {name:"铜川", short: "B"},
    {name:"宝鸡", short: "C"},
    {name:"咸阳", short: "D"},
    {name:"渭南", short: "E"},
    {name:"延安", short: "J"},
    {name:"汉中", short: "F"},
    {name:"榆林", short: "K"},
    {name:"安康", short: "G"},
    {name:"商洛", short: "H"},

  ]

  list['甘'] =[
    {name:"兰州", short: "A"},
    {name:"嘉峪关", short: "B"},
    {name:"金昌", short: "C"},
    {name:"白银", short: "D"},
    {name:"天水", short: "E"},
    {name:"武威", short: "H"},
    {name:"张掖", short: "G"},
    {name:"平凉", short: "L"},
    {name:"酒泉", short: "F"},
    {name:"庆阳", short: "M"},
    {name:"定西", short: "J"},
    {name:"陇南", short: "K"},
    {name:"临夏州", short: "N"},
    {name:"甘南州", short: "P"},

  ]

  list['青'] =[

  ]

  list['宁'] =[
    {name:"银川", short: "A"},
    {name:"石嘴山", short: "B"},
    {name:"吴忠", short: "C"},
    {name:"固原", short: "D"},
    {name:"中卫", short: "E"},
  ]

  list['新'] =[
    {name:"乌鲁木齐", short: "A"},
    {name:"克拉玛依", short: "J"},
    {name:"吐鲁番", short: "K"},
    {name:"哈密地区", short: "L"},
    {name:"昌吉州", short: "B"},
    {name:"博尔塔拉州", short: "E"},
    {name:"巴音郭楞州", short: "M"},
    {name:"阿克苏地区", short: "N"},
    {name:"克孜勒苏州", short: "P"},
    {name:"喀什地区", short: "Q"},
    {name:"和田地区", short: "R"},
    {name:"伊犁州", short: "D"},
    {name:"塔城地区", short: "G"},
    {name:"阿勒泰地区", short: "H"},
    {name:"石河子市", short: "C"},
  ]
  return list
}
