
export function getShortProvinces() {
  let list = [
    "京","津","冀","晋","内",
    "辽","吉","黑","沪","苏",
    "浙","皖","闽","赣","鲁",
    "豫","鄂","湘","粤","桂",
    "琼","川","黔","滇","渝",
    "藏","陕","甘","青","宁",
  ];
  return list
}

export function getProvinces() {
  let list = [
    {name:"安徽", short: "皖"}, {name:"江苏", short: "苏"}, {name:"浙江", short: "浙"}, 
    {name:"北京", short: "京"}, {name:"天津", short: "津"}, {name:"河北", short: "冀"},
    {name:"山西", short: "晋"}, {name:"内蒙古", short: "内"}, {name:"辽宁", short: "辽"},
    {name:"吉林", short: "吉"}, {name:"黑龙江", short: "黑"}, {name:"上海", short: "沪"},
    
    {name:"福建", short: "闽"}, {name:"江西", short: "赣"}, {name:"山东", short: "鲁"},
    {name:"河南", short: "豫"}, {name:"湖北", short: "鄂"}, {name:"湖南", short: "湘"},
    {name:"广东", short: "粤"}, {name:"广西", short: "桂"}, {name:"海南", short: "琼"},
    {name:"四川", short: "川"}, {name:"贵州", short: "黔"}, {name:"云南", short: "滇"},
    {name:"重庆", short: "渝"}, {name:"西藏", short: "藏"}, {name:"陕西", short: "陕"},
    {name:"甘肃", short: "甘"}, {name:"青海", short: "青"}, {name:"宁夏", short: "宁"},
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

  ]

  list['内'] =[

  ]

  list['辽'] =[

  ]

  list['吉'] =[

  ]

  list['黑'] =[

  ]

  list['闽'] =[

  ]

  list['赣'] =[

  ]

  list['鲁'] =[

  ]

  list['豫'] =[

  ]

  list['鄂'] =[

  ]

  list['湘'] =[

  ]
  return list
}
