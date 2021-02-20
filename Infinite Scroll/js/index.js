console.clear();
let firebaseConfig = {
  apiKey: "AIzaSyAdmPOeMl_kYvy0SpuSN4jmhWgtgBgizEs",
  authDomain: "shop1688mkt.firebaseapp.com",
  databaseURL: "https://shop1688mkt.firebaseio.com",
  projectId: "shop1688mkt",
  storageBucket: "shop1688mkt.appspot.com",
  messagingSenderId: "359212500160",
  appId: "1:359212500160:web:0eee6dfb29983add"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let cityData = [
  "基隆市",
  "臺北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "臺中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "臺南市",
  "高雄市",
  "屏東縣",
  "臺東縣",
  "花蓮縣",
  "宜蘭縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
  "開山里"
];

new Vue({
  el: "#app",
  data: {
    fireItems: [],
    allShop: [],
    latestDoc: null,
    isDisabl: false,
    cityData,
    filterItem: [],
    option: "",
    //  infinite scroll
    loading: false,
    newData: [],
    currentLength: 0
  },
  computed: {
    currentItems() {
      if (this.option) {
        return this.filterItem[this.option]
      }
      return []
    }
  },
  watch: {
    option() {
      this.newData = []
      this.currentLength = 0
    }
  },
  async created() {
    this.fireItems = await this.fireData();
    this.filterItem = this.fireItems.reduce((acc, curr) => {
      const city = curr['地址'][0]
      acc[city] !== undefined ? acc[city].push(curr) : acc[city] = [curr]
      return acc
    }, {})
  },
  mounted() {
    // Detect when scrolled to bottom.
    const container = document.querySelector(".header");
    container.addEventListener("scroll", (e) => {
      const triggerHeight = container.scrollTop + container.clientHeight;
      if (triggerHeight === container.scrollHeight) {
        this.search()
      }
    });
  },
  methods: {
    async fireData() {
      const ref = db
        .collection("shop1688web")
        .orderBy("bid")
      const data = await ref.get();
      return data.docs.map(doc => doc.data())
    },
    search() {
      const temp = this.currentLength
      this.currentLength += 12
      const items = this.currentItems.slice(temp, this.currentLength)
      this.newData = [
        ...this.newData,
        ...items
      ]
    },
  },
});