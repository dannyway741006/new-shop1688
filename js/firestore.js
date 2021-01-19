let firebaseConfig = {
  apiKey: "AIzaSyAdmPOeMl_kYvy0SpuSN4jmhWgtgBgizEs",
  authDomain: "shop1688mkt.firebaseapp.com",
  databaseURL: "https://shop1688mkt.firebaseio.com",
  projectId: "shop1688mkt",
  storageBucket: "shop1688mkt.appspot.com",
  messagingSenderId: "359212500160",
  appId: "1:359212500160:web:0eee6dfb29983add"
};
let typeData = [
  '旅遊美食', '交通運輸', '商業學術', '生活服務', '居家裝潢', '醫療保健',
  '工商服務'
];

let cityData = ['基隆市', '臺北市', '新北市', "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣",
  "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "臺東縣", "花蓮縣", "宜蘭縣",
  "澎湖縣", "金門縣", "連江縣",
  // {
  //   label: "台北市",
  //   value: "臺北市"
  // }, {
  //   label: "台中市",
  //   value: "臺中市"
  // }, {
  //   label: "台南市",
  //   value: "臺南市"
  // }, {
  //   label: "台東縣",
  //   value: "臺東縣"
  // },
  "開山里"
];

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();