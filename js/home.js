let firebaseConfig = {
  apiKey: "AIzaSyAdmPOeMl_kYvy0SpuSN4jmhWgtgBgizEs",
  authDomain: "shop1688mkt.firebaseapp.com",
  databaseURL: "https://shop1688mkt.firebaseio.com",
  projectId: "shop1688mkt",
  storageBucket: "shop1688mkt.appspot.com",
  messagingSenderId: "359212500160",
  appId: "1:359212500160:web:0eee6dfb29983add"
};
let newTypeData = [
  '旅遊美食', '交通運輸', '商業學術', '生活服務', '居家裝潢', '醫療保健',
  '工商服務'
];
let typeData = [{
  title: '旅遊美食',
  cat: '旅遊美食'
},
{
  title: '交通運輸',
  cat: '交通運輸'
},
{
  title: '商業學術',
  cat: '商業學術'
},
{
  title: '生活服務',
  cat: '生活服務'
},
{
  title: '居家裝潢',
  cat: '居家裝潢'
},
{
  title: '醫療保健',
  cat: '醫療保健'
},
{
  title: '工商服務',
  cat: '工商服務'
},
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
new Vue({
  el: "#app",
  data: {
    nowDay: '',
    nowTime: '',
    typeData,
    newTypeData,
    cityData,
    filterItem: [],
    fireItems: [],

    iconmap: [],
    allTitle: [],
    input: {
      type: '',
      city: '',
    },
    typeTitle: '請重新搜尋',
    cityTitle: '',
    allShop: [],
    icon: {
      "旅遊美食": 'food.png',
      "交通運輸": 'car.png',
      "商業學術": 'Furniture.png',
      "生活服務": 'life.png',
      "居家裝潢": 'medical.png',
      "醫療保健": 'ser.png',
      "工商服務": 'user-graduate-solid.png',
    },
    // class 切換
    openTypeSearch: false,
    closeTypeSearch: false,
    openCitySearch: false,
    closeOpenCitySearch: false,
    baColorChange: false,
    typeBgChange: false,
    cityBgChange: false,

    // class 切換 end
    // tab 切換
    cur: 0, //默认选中第一个tab
    // tab 切換 end

    // scroll input
    scrollInput: false,
    // scroll input end
    // scroll input animation
    creatScrollBar: false,
    maskAll: false,
    // scroll input animation end
  },

  computed: {

    titleMenu() {

      const value = this.input.type.toLowerCase();
      if (value === "旅遊美食" || value === "交通運輸" || value === "居家裝潢" || value === "醫療保健" || value === "工商服務" || value === "生活服務" || value === "商業學術") {
        return this.typeData;
        // this.searchPadding = false;
      }

      if (value.trim()) {
        return this.allShop.filter(item => {
          return item.title.toLowerCase().indexOf(value) !== -1;
          //this.searchPadding = false;
        })

      } else {
        //this.searchPadding = false;
        return this.typeData;
      }

    },
  },

  methods: {
    dosomething(event) {
      event.currentTarget.src = "./img/shop_item.svg"
    },


    onScroll() {
      const scrollTop =
        document.documentElement.scrollTop + document.body.scrollTop;
      let Y;
      Y = Math.floor(window.pageYOffset);
      let header = document.querySelector('.header');
      let fixed = document.querySelector('.shop-input-fixed');
      let allSection = document.querySelector('.all-section');
      if (allSection.getBoundingClientRect().top < 0) {
        this.scrollInput = true;
      } else {
        this.scrollInput = false;
      }
    },


    dropMove() {
      let slider = document.querySelector('.hot-shop-more');
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        console.log("asdfasdf")
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
      });
    },
    // search bar 動畫控制
    removeMask() {
      this.creatScrollBar = false;
      this.maskAll = false;
    },
    headerRemove() {
      this.cityBgChange = false;
      this.typeBgChange = false;
      if (this.openTypeSearch === true && this.openCitySearch === false) {
        this.openTypeSearch = false;
        this.closeTypeSearch = true;
        this.baColorChange = false;
      } else {
        if (this.openTypeSearch === false && this.openCitySearch === true) {
          this.closeOpenCitySearch = true;
          this.openCitySearch = false;
          this.baColorChange = false;
        }
      }
    },
    openSearchItems() {
      // this.maskAll = true,
      this.creatScrollBar = true;
      this.creatScrollBar = true;
      this.cityBgChange = false;
      this.typeBgChange = true;
      this.baColorChange = true;

      if (this.openCitySearch === false && this.openTypeSearch === false) {
        this.openTypeSearch = true;
        this.closeTypeSearch = false;

      } else {
        if (this.openTypeSearch === false && this.openCitySearch === true) {
          this.closeOpenCitySearch = true;
          this.openCitySearch = false;
          this.openTypeSearch = true;
          this.closeTypeSearch = false;

        }

      }
    },
    opencitySearchItems() {
      // this.maskAll = true,
      this.creatScrollBar = true;
      this.creatScrollBar = true;
      this.cityBgChange = true;
      this.typeBgChange = false;
      this.baColorChange = true;
      if (this.openCitySearch === false && this.openTypeSearch === false) {
        this.openCitySearch = true;
        this.closeOpenCitySearch = false;
      } else {
        if (this.openTypeSearch === true && this.openCitySearch === false) {
          this.closeTypeSearch = true;
          this.openTypeSearch = false;
          this.openCitySearch = true;
          this.closeOpenCitySearch = false;
        }
      }
    },
    // search bar 動畫控制 end


    // 錨點平滑滾動
    scroll(t) {
      window.scrollTo({
        // 通过offsetYop获取元素位置
        // -100是为了避免它直接滑动到屏幕顶部，怪丑的
        top: this.$refs[t].offsetTop,
        behavior: "smooth" // 平滑滚动
      })
    },
    // 錨點平滑滾動 end

    fireData() {
      db.collection('shop1688web')
        .limit(547)
        .get()
        .then(querySnapshot => {
          // let i = 1;
          querySnapshot.forEach(doc => {
            // console.log(i++)
            // console.log(i++, doc.data().bid);
            let temp = {
              title: '',
              cat: ''
            };
            this.fireItems.push(doc.data());
            temp.title = doc.data().名稱;
            temp.cat = doc.data().分類[0];
            this.allShop.push(temp);
          });
        })
    },

    // 得到當下時間

    timeFormate(timeStamp) {
      let newdate = new Date(timeStamp);
      let week = ['日', '一', '二', '三', '四', '五', '六'];

      let year = newdate.getFullYear();
      let month = newdate.getMonth() + 1 < 10 ? "0" + (newdate.getMonth() + 1) : newdate.getMonth() + 1;
      let date = newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate();
      let hh = newdate.getHours() < 10 ? "0" + newdate.getHours() : newdate.getHours();
      let mm = newdate.getMinutes() < 10 ? "0" + newdate.getMinutes() : newdate.getMinutes();
      let ss = newdate.getSeconds() < 10 ? "0" + newdate.getSeconds() : newdate.getSeconds();

      this.nowTime = hh + ":" + mm + ":" + ss;
      this.nowDay = year + "/" + month + "/" + date;
    },
    // 定時器函數
    nowTimes() {
      let self = this;
      self.timeFormate(new Date());
      setInterval(function () {
        self.timeFormate(new Date());
      }, 1000);
    },
    //需加強！//
    food() {
      console.log(this.typeData[0].title);
      this.typeTitle = this.typeData[0].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[0].title);
      })
    },
    car() {
      this.typeTitle = this.typeData[1].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[1].title);
      })
    },
    academic() {
      this.typeTitle = this.typeData[2].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[2].title);
      })
    },
    serivce() {
      this.typeTitle = this.typeData[3].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[3].title);
      })
    },
    home() {
      this.typeTitle = this.typeData[4].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[4].title);
      })
    },
    medical() {
      this.typeTitle = this.typeData[5].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[5].title);
      })
    },
    business() {
      this.typeTitle = this.typeData[6].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[6].title);
      })
    },
    //需加強！ end//
    async search() {
      // this.maskAll = true,
      this.typeTitle = this.input.type;
      this.cityTitle = this.input.city;



      this.filterItem = this.fireItems.filter(item => {

        return item.名稱.toLowerCase().trim() === this.input.type.toLowerCase().trim();
      })



      if (this.filterItem.length) {
        // this.controlType = true;
        // this.mapSwitch = false;
        // for (let i = 0; i < this.filterItem.length; i++) {
        //   try {
        //     await this.geocodeResults(
        //       new google.maps.Geocoder(),
        //       this.map,
        //       this.filterItem[i]['名稱'],
        //       this.cardBid = this.filterItem[i].bid,
        //       this.cardName = this.filterItem[i].分類[0],
        //       this.apndWant(),
        //     );
        //     console.log(this.apndWant());
        //   } catch (e) {
        //     console.log(e)
        //   }
        // }
      } else {
        // if (!this.controlType) {
        //   // this.onlyBg = true;
        //   // this.logo = true;
        //   console.log("aaaaadddd");
        // } else {
        //   console.log("asdfasdf");
        //   // this.logo = true;
        //   // this.onlyBg = false;
        // }
        if (this.input.city) {
          // this.controlType = false;
          // this.mapSwitch = true;


          this.filterItem = this.fireItems.filter(item => {
            return item['地址'].includes(this.input.city);
          })
        }
        if (this.newTypeData.includes(this.input.type)) {
          // this.controlType = false;
          // this.mapSwitch = true;
          const shopload = this.input.city ? this.filterItem : this.fireItems
          this.filterItem = shopload.filter(item => {
            return item.分類[0].includes(this.input.type);
          })
          if (this.input.type && this.input.city) {
            // this.controlType = true;
            // this.mapSwitch = false;
            // searchbar
            // this.typeActive = false;
            // this.scrollActive = false;
            // this.inputSmall = false;
            // this.inputBig = true;
            // this.linkActive = false;
            // this.linkActive_no = true;
            // this.cityActive = true;

            // this.allNavClose = false;
            // this.allNavHeight = true;

            // searchbar end
            // this.navBar0 = false;
            // this.navBarY = true;
            // if (this.input.city === "臺中市") {
            //   this.centerTaichung();
            // } else if (this.input.city === "臺北市") {
            //   this.centerTaipei();
            // } else if (this.input.city === "新北市") {
            //   this.centerNewTaipei();
            // } else if (this.input.city === "基隆市") {
            //   this.centerKeelung();
            // } else if (this.input.city === "新竹市") {
            //   this.centerHsinchu();
            // } else if (this.input.city === "桃園市") {
            //   this.centerTaoyuan();
            // } else if (this.input.city === "苗栗縣") {
            //   this.centerMiaoli();
            // } else if (this.input.city === "彰化縣") {
            //   this.centerChanghua();
            // } else if (this.input.city === "南投縣") {
            //   this.centerNantou();
            // } else if (this.input.city === "雲林縣") {
            //   this.centerYunlin();
            // } else if (this.input.city === "嘉義市") {
            //   this.centerChiayi();
            // } else if (this.input.city === "臺南市") {
            //   this.centerTainan();
            // } else if (this.input.city === "高雄市") {
            //   this.centerKaohsiung();
            // } else if (this.input.city === "宜蘭縣") {
            //   this.centerYilan();
            // } else if (this.input.city === "屏東縣") {
            //   this.centerPingtung();
            // } else if (this.input.city === "臺東縣") {
            //   this.centerTaitung();
            // } else if (this.input.city === "花蓮縣") {
            //   this.centerHualian();
            // } else if (this.input.city === "澎湖縣") {
            //   this.centerPenghu();
            // } else if (this.input.city === "金門縣") {
            //   this.centerKinmen();
            // } else if (this.input.city === "連江縣") {
            //   this.centerLianjiang();
            // }
            const shopload = this.input.city ? this.filterItem : this.fireItems
            this.filterItem = shopload.filter(item => {
              return item.分類[0].includes(this.input.type);
            })
            // for (let i = 0; i < this.filterItem.length; i++) {
            //   try {
            //     await this.geocodeResults(
            //       new google.maps.Geocoder(),
            //       this.map,
            //       this.filterItem[i]['名稱'],
            //       this.cardBid = this.filterItem[i].bid,
            //       this.cardName = this.filterItem[i].分類[0],
            //     );
            //   } catch (e) {
            //     console.log(e)
            //   }
            // }
          }
        } else {
          // if (this.input.city === "臺中市") {
          //   this.centerTaichung();
          // } else if (this.input.city === "臺北市") {
          //   this.centerTaipei();
          // } else if (this.input.city === "新北市") {
          //   this.centerNewTaipei();
          // } else if (this.input.city === "基隆市") {
          //   this.centerKeelung();
          // } else if (this.input.city === "新竹市") {
          //   this.centerHsinchu();
          // } else if (this.input.city === "桃園市") {
          //   this.centerTaoyuan();
          // } else if (this.input.city === "苗栗縣") {
          //   this.centerMiaoli();
          // } else if (this.input.city === "彰化縣") {
          //   this.centerChanghua();
          // } else if (this.input.city === "南投縣") {
          //   this.centerNantou();
          // } else if (this.input.city === "雲林縣") {
          //   this.centerYunlin();
          // } else if (this.input.city === "嘉義市") {
          //   this.centerChiayi();
          // } else if (this.input.city === "臺南市") {
          //   this.centerTainan();
          // } else if (this.input.city === "高雄市") {
          //   this.centerKaohsiung();
          // } else if (this.input.city === "宜蘭縣") {
          //   this.centerYilan();
          // } else if (this.input.city === "屏東縣") {
          //   this.centerPingtung();
          // } else if (this.input.city === "臺東縣") {
          //   this.centerTaitung();
          // } else if (this.input.city === "花蓮縣") {
          //   this.centerHualian();
          // } else if (this.input.city === "澎湖縣") {
          //   this.centerPenghu();
          // } else if (this.input.city === "金門縣") {
          //   this.centerKinmen();
          // } else if (this.input.city === "連江縣") {
          //   this.centerLianjiang();
          // }
          this.controlType = false;
          this.mapSwitch = true;
          const payload = this.input.city ? this.filterItem : this.fireItems
          this.filterItem = payload.filter(item => {
            return item.名稱.toLowerCase().includes(this.input.type.toLowerCase())
          })
          if (this.input.type && this.input.city) {

            // this.controlType = true;
            // this.mapSwitch = false;
            // searchbar
            // this.typeActive = false;
            // this.scrollActive = false;
            // this.inputSmall = false;
            // this.inputBig = true;
            // this.linkActive = false;
            // this.linkActive_no = true;
            // this.cityActive = true;

            // this.allNavClose = false;
            // this.allNavHeight = true;
            // searchbar end
            // this.navBar0 = false;
            // this.navBarY = true;

            const payload = this.input.city ? this.filterItem : this.fireItems
            this.filterItem = payload.filter(item => {
              return item.名稱.toLowerCase().includes(this.input.type.toLowerCase())
            })
            // for (let i = 0; i < this.filterItem.length; i++) {
            //   try {
            //     await this.geocodeResults(
            //       new google.maps.Geocoder(),
            //       this.map,
            //       this.filterItem[i]['名稱'],
            //       this.cardBid = this.filterItem[i].bid,
            //       this.cardName = this.filterItem[i].分類[0],
            //     );
            //   } catch (e) {
            //     console.log(e)
            //   }
            // }
          }
        }
      }
      console.log("asdfasdfasdfas")
      this.input.city = "";
      this.input.type = "";
    }
  },

  mounted() {
    document.addEventListener('scroll', this.onScroll);
    let draggableArea = document.querySelector('.draggableArea');
    let square1 = document.querySelector('#square1');
    let square2 = document.querySelector('#square2');
    let square3 = document.querySelector('#square3');
    let square4 = document.querySelector('#square4');
    let square5 = document.querySelector('#square5');


    Draggable.create("#square1", {
      bounds: draggableArea,
      dragClickables: true,
      type: 'x,y',
      // radius: 15,
    })
    Draggable.create('#square2', {
      bounds: draggableArea,
      dragClickables: true,
      type: 'x,y',
      // radius: 15,
    })
    Draggable.create('#square3', {
      bounds: draggableArea,
      dragClickables: true,
      type: 'x,y',
      // radius: 15,
    })
    Draggable.create('#square4', {
      bounds: draggableArea,
      dragClickables: true,
      type: 'x,y',
      zIndex: 500,
      // radius: 15,
    })
    Draggable.create('#square5', {
      bounds: draggableArea,
      dragClickables: false,
      type: 'x,y',
      zIndex: -2000,
      // radius: 15,
    })
  },


  // 創建完成時
  created() {
    window.addEventListener("load", () => {
      this.fireData();
      this.nowTimes();
      this.onScroll();
      // this.localMounted();
      // this.test();
    });

  },
})
