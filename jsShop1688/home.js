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
    i: 0,
    icon: {
      "旅遊美食": 'food.png',
      "交通運輸": 'car.png',
      "商業學術": 'furniture.png',
      "生活服務": 'life.png',
      "居家裝潢": 'medical.png',
      "醫療保健": 'ser.png',
      "工商服務": 'user-graduate-solid.png',
    },

    textword: "",
    searchWord: "",
    webBtnSearch: "",
    // class 切換
    openTypeSearch: false,
    closeTypeSearch: false,
    openCitySearch: false,
    closeOpenCitySearch: false,
    baColorChange: false,
    typeBgChange: false,
    cityBgChange: false,
    resultPageSwitch: true,
    mainSwitch: false,
    mapInputSwitch: true,
    headerSwitch: false,
    mapBoxClose: false,
    mapCloseClose: false,
    resultsMapSwitch: false,
    mapOpen: false,
    openTypeMap: false,
    openHeaderMask: false,
    dockSwitch: false,
    dockBoxSwitch: false,
    shop1688WebSwatch: false,
    goTopSwitch: false,
    now: -1,
    // class 切換 end
    // tab 切換
    cur: 0, //默認選中第一个tab
    // tab 切換 end

    src: 0,
    web: [{
        itemnum: "mas20210113949487",
        src: 0,
        name: "羅東小築",
        lat: "24.6653995",
        lng: "121.7999018",
        address: "宜蘭縣",
        icon: "food.png",
        type: "旅遊美食",

      },
      {
        itemnum: "aom20200629009",
        src: 1,
        name: "Opium 韓國批發",
        lat: "25.046776397292927",
        lng: "121.57923591534076",
        address: "台北市",
        icon: "life.png",
        type: "生活服務"
      },
      {
        itemnum: "aom20200623034",
        src: 2,
        name: "123玩遊戲",
        lat: "25.112485733114262",
        lng: "121.52925008465925",
        address: "台北市",
        icon: "life.png",
        type: "生活服務"
      },
      {
        itemnum: "aom20200630010",
        src: 3,
        name: "捷透肌男士保養",
        lat: "25.046251746556315",
        lng: "121.52966375958923",
        address: "新北市",
        icon: "life.png",
        type: "生活服務"
      }, {

        itemnum: "aom20200429001",
        src: 4,
        name: "Jc art studio",
        lat: "24.19476467966244",
        lng: "120.70262254232965",
        address: "臺中市",
        icon: "life.png",
        type: "生活服務"
      }, {
        itemnum: "aom20200427019",
        src: 5,
        name: "MODA.沐mood 沐達精品服飾",
        lat: "24.109500369605197",
        lng: "120.67635625397774",
        address: "臺中市",
        icon: "life.png",
        type: "生活服務"
      }, {
        itemnum: "aom20191129023",
        src: 6,
        name: "Wrap Bull銳步設計",
        lat: "24.149887843932614",
        lng: "120.6312790000035",
        address: "臺中市",
        icon: "life.png",
        type: "生活服務"
      },
      {
        itemnum: "aom20200427031",
        src: 7,
        name: "2-Sheep 韓國服飾",
        lat: "24.081169978249623",
        lng: "120.57108982740537",
        address: "彰化縣",
        icon: "life.png",
        type: "生活服務"
      }
    ],

    // scroll input
    scrollInput: false,
    // scroll input end
    // scroll input animation
    creatScrollBar: false,
    maskAll: false,
    // scroll input animation end
    // google map
    map: null,
    lat: 25.0325917,
    lng: 121.5624999,
    zoom: 7,
    markers: [],
    infowindow: null,
    // google map end
  },

  computed: {
    titleMenu() {
      const value = this.input.type.toLowerCase();
      if (value === "旅遊美食" || value === "交通運輸" || value === "居家裝潢" || value === "醫療保健" || value === "工商服務" || value === "生活服務" || value === "商業學術") {
        return this.typeData;
      }
      if (value.trim()) {
        return this.allShop.filter(item => {
          return item.title.toLowerCase().indexOf(value) !== -1;
        })
      } else {
        return this.typeData;
      }
    },
  },

  methods: {
    selectDown() {
      // this.now++;
      console.log(this.now++);
      // console.log(this.input.type = this.titleMenu[0])
      // if (this.now == this.titleMenu.length) this.now = -1;
      // this.input.type = this.titleMenu[this.now];
    },

    changeHref(e) {
      this.hrefShop = this.web[e];
    },
    resizeAll() {
      if (document.body.getBoundingClientRect().width <= 1280) {
        this.mapBoxClose = true;
        this.mapCloseClose = true;
        this.mapOpen = true;
      }
    },
    openNav() {
      this.openHeaderMask = true;
      this.dockSwitch = true;
      this.dockBoxSwitch = true;
      this.shop1688WebSwatch = true;
    },
    closeHeaderMask() {
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
    },
    closeMap() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      this.mapBoxClose = true;
      this.mapCloseClose = true;
      this.resultsMapSwitch = true;
      this.mapOpen = true;
      if (document.body.getBoundingClientRect().width <= 1280) {
        this.openTypeMap = false;
      }

    },
    openMap() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      this.mapBoxClose = false;
      this.mapCloseClose = false;
      this.resultsMapSwitch = false;
      this.mapOpen = false;
      if (document.body.getBoundingClientRect().width <= 1280) {
        this.openTypeMap = true;
      }

    },
    closeWeb() {
      const icon = document.querySelector('.shop-web')
      const squareIcon = document.querySelector('.square-shop-web')

      const windowItem = document.querySelector('.shop1688-web')
      const close = document.querySelector('.touch-close')
      const iconRect = icon.getBoundingClientRect()
      const squareIconRect = squareIcon.getBoundingClientRect()
      const windowRect = windowItem.getBoundingClientRect()
      const header = document.querySelector('.header');
      const headerRect = header.getBoundingClientRect();
      if (headerRect.width > 770) {
        windowItem.style.transform = `translate(-50%, -50%) scale(${0})`
        windowItem.style.top = `${iconRect.top + iconRect.height / 2}px`
        windowItem.style.left = `${iconRect.left + iconRect.width / 2}px`
        windowItem.style.opacity = `0`
      } else {
        windowItem.style.transform = `translate(-50%, -50%) scale(${0})`
        windowItem.style.top = `${squareIconRect.top + squareIconRect.height / 2}px`
        windowItem.style.left = `${squareIconRect.left + squareIconRect.width / 2}px`
        windowItem.style.opacity = `0`
      }

    },
    openWeb() {
      const icon = document.querySelector('.shop-web')
      const windowItem = document.querySelector('.shop1688-web')
      const close = document.querySelector('.touch-close')
      const iconRect = icon.getBoundingClientRect()
      const windowRect = windowItem.getBoundingClientRect()
      const header = document.querySelector('.header');
      const headerRect = header.getBoundingClientRect();
      if (headerRect.width > 770) {
        windowItem.style.transform = `translate(-50%, -50%) scale(${1})`
        windowItem.style.top = `${45}%`
        windowItem.style.left = `${50}%`
        windowItem.style.opacity = `1`
        windowItem.style.zIndex = `9999999`
      }

    },
    rwdOpenWeb() {
      const icon = document.querySelector('.square-shop-web')
      const windowItem = document.querySelector('.shop1688-web')
      const close = document.querySelector('.touch-close')
      const iconRect = icon.getBoundingClientRect()
      const windowRect = windowItem.getBoundingClientRect()
      const header = document.querySelector('.header');
      const headerRect = header.getBoundingClientRect();
      if (headerRect.width <= 770) {
        windowItem.style.transform = `translate(-50%, -50%) scale(${1})`
        windowItem.style.top = `${41}%`
        windowItem.style.left = `${50}%`
        windowItem.style.opacity = `1`
        windowItem.style.zIndex = `9999999`
      }

    },

    onScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop
      let header = document.querySelector('.header');
      let Y;
      // console.log()
      Y = Math.floor(window.pageYOffset);
      // console.log(header.getBoundingClientRect().bottom);
      this.searchWord = "";
      if (header.getBoundingClientRect().bottom <= 0) {
        this.scrollInput = true;
        if (this.openCitySearch === true || this.openTypeSearch === true) {
          this.creatScrollBar = true;
          this.maskAll = true;
        } else {
          this.creatScrollBar = false;
          this.maskAll = false;
        }
      } else {
        this.maskAll = false;
        this.scrollInput = false;
      }

      if (Y >= 200) {
        this.goTopSwitch = true
      } else {
        this.goTopSwitch = false

      }
    },


    dropMove() {
      let slider = document.querySelector('.hot-shop-more');
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        // console.log("asdfasdf")
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
      this.openCitySearch = false;
      this.openTypeSearch = false;
      this.creatScrollBar = false;
      this.maskAll = false;
      this.searchWord = "";

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
      let header = document.querySelector('.header');
      if (header.getBoundingClientRect().bottom <= 0) {
        this.maskAll = true;
      }
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


      if (document.body.getBoundingClientRect().width <= 770) {


        this.searchWord = "搜尋";

      }
    },
    opencitySearchItems() {
      let header = document.querySelector('.header');
      if (header.getBoundingClientRect().bottom <= 0) {
        this.maskAll = true;
      }
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
      if (document.body.getBoundingClientRect().width <= 770) {
        this.searchWord = "搜尋";
      }
    },
    // search bar 動畫控制 end

    // 錨點平滑滾動
    scroll(t) {

      window.scrollTo({
        top: this.$refs[t].offsetTop,
        behavior: "smooth"
      })
    },
    // 錨點平滑滾動 end

    fireData() {
      db.collection('shop1688web')
        // .limit(246)
        .get()
        .then(querySnapshot => {
          let i = 1;
          querySnapshot.forEach(doc => {
            // console.log(i++)
            console.log(i++, doc.data().bid);
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
      // console.log(this.typeData[0].title);
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[0].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[0].title);
      })
    },
    car() {
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[1].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[1].title);
      })
    },
    academic() {
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[2].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[2].title);
      })
    },
    serivce() {
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[3].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[3].title);
      })
    },
    home() {
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[4].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[4].title);
      })
    },
    medical() {
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[5].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[5].title);
      })
    },
    business() {
      this.cityTitle = "";
      this.openHeaderMask = false;
      this.dockSwitch = false;
      this.dockBoxSwitch = false;
      this.mainSwitch = true;
      this.resultPageSwitch = false;
      this.typeTitle = this.typeData[6].title;
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[6].title);
      })
    },
    //需加強！ end//
    async search() {
      let header = document.querySelector('.header');
      let headerHeight = header.getBoundingClientRect().height;

      this.textword = "";
      this.searchWord = "";
      this.maskAll = false;
      this.creatScrollBar = false;

      this.deleteMarkers();
      this.typeTitle = "";
      this.cityTitle = "";
      this.typeTitle = this.input.type;

      this.cityTitle = this.input.city;
      if (document.body.getBoundingClientRect().width <= 1280) {
        this.mapBoxClose = true;
        this.openTypeMap = false;
        this.mapCloseClose = true;
        this.mapOpen = true;
      }
      if (this.input.type || this.input.city) {
        this.filterItem = this.fireItems.filter(item => {

          let header = document.querySelector('.header');
          let headerHeight = header.getBoundingClientRect().height;
          window.scrollTo({
            top: headerHeight,
            behavior: "smooth"
          })
          this.mainSwitch = true;
          this.resultPageSwitch = false;
          this.headerSwitch = false;
          this.mapInputSwitch = true;
          return item.名稱.toLowerCase().trim() === this.input.type.toLowerCase().trim();
        })





        if (this.filterItem.length) {
          if (this.filterItem.length === 1) {
            this.cityTitle = this.filterItem[0].地址[0];
          }

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
          this.mapInputSwitch = false;
          this.resultPageSwitch = true;
          this.headerSwitch = true;
          this.scrollInput = true;
          for (let i = 0; i < this.filterItem.length; i++) {
            try {
              await this.geocodeResults(
                new google.maps.Geocoder(),
                this.map,
                this.filterItem[i]['名稱'],
                this.cardBid = this.filterItem[i].bid,
                this.cardName = this.filterItem[i].分類[0],
                // this.apndWant(),
              );
              this.apndWant();
            } catch (e) {
              // console.log(e)
            }
          }


          this.input.city = "";
          this.input.type = "";
        } else {

          if (this.input.city) {

            this.scrollInput = false;
            this.resultPageSwitch = false;
            this.mainSwitch = true;
            this.headerSwitch = false;
            this.mapInputSwitch = true;
            this.filterItem = this.fireItems.filter(item => {
              return item['地址'].includes(this.input.city);
            })

          }
          if (this.newTypeData.includes(this.input.type)) {

            this.scrollInput = true;
            this.resultPageSwitch = false;
            this.mainSwitch = true;
            this.headerSwitch = false;
            this.mapInputSwitch = true;
            this.scrollInput = false;
            const shopload = this.input.city ? this.filterItem : this.fireItems
            this.filterItem = shopload.filter(item => {
              return item.分類[0].includes(this.input.type);
            })
            if (this.input.type && this.input.city) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
              // console.log("close");
              this.scrollInput = true;
              this.resultPageSwitch = true;
              this.mainSwitch = true;
              this.headerSwitch = true;
              this.mapInputSwitch = false;

              if (this.input.city === "臺中市") {
                this.centerTaichung();
              } else if (this.input.city === "臺北市") {
                this.centerTaipei();
              } else if (this.input.city === "新北市") {
                this.centerNewTaipei();
              } else if (this.input.city === "基隆市") {
                this.centerKeelung();
              } else if (this.input.city === "新竹市") {
                this.centerHsinchu();
              } else if (this.input.city === "桃園市") {
                this.centerTaoyuan();
              } else if (this.input.city === "苗栗縣") {
                this.centerMiaoli();
              } else if (this.input.city === "彰化縣") {
                this.centerChanghua();
              } else if (this.input.city === "南投縣") {
                this.centerNantou();
              } else if (this.input.city === "雲林縣") {
                this.centerYunlin();
              } else if (this.input.city === "嘉義市") {
                this.centerChiayi();
              } else if (this.input.city === "臺南市") {
                this.centerTainan();
              } else if (this.input.city === "高雄市") {
                this.centerKaohsiung();
              } else if (this.input.city === "宜蘭縣") {
                this.centerYilan();
              } else if (this.input.city === "屏東縣") {
                this.centerPingtung();
              } else if (this.input.city === "臺東縣") {
                this.centerTaitung();
              } else if (this.input.city === "花蓮縣") {
                this.centerHualian();
              } else if (this.input.city === "澎湖縣") {
                this.centerPenghu();
              } else if (this.input.city === "金門縣") {
                this.centerKinmen();
              } else if (this.input.city === "連江縣") {
                this.centerLianjiang();
              }
              const shopload = this.input.city ? this.filterItem : this.fireItems
              this.filterItem = shopload.filter(item => {
                return item.分類[0].includes(this.input.type);
              })
              // console.log(this.filterItem);
              if (this.filterItem.length === 0) {

                this.textword = "很抱歉...查無此商家,請重新搜尋。"

              }
              for (let i = 0; i < this.filterItem.length; i++) {
                try {
                  await this.geocodeResults(
                    new google.maps.Geocoder(),
                    this.map,
                    this.filterItem[i]['名稱'],
                    this.cardBid = this.filterItem[i].bid,
                    this.cardName = this.filterItem[i].分類[0],
                  );
                } catch (e) {
                  // console.log(e)
                }
              }

            }
          } else {
            if (this.input.city === "臺中市") {
              this.centerTaichung();
            } else if (this.input.city === "臺北市") {
              this.centerTaipei();
            } else if (this.input.city === "新北市") {
              this.centerNewTaipei();
            } else if (this.input.city === "基隆市") {
              this.centerKeelung();
            } else if (this.input.city === "新竹市") {
              this.centerHsinchu();
            } else if (this.input.city === "桃園市") {
              this.centerTaoyuan();
            } else if (this.input.city === "苗栗縣") {
              this.centerMiaoli();
            } else if (this.input.city === "彰化縣") {
              this.centerChanghua();
            } else if (this.input.city === "南投縣") {
              this.centerNantou();
            } else if (this.input.city === "雲林縣") {
              this.centerYunlin();
            } else if (this.input.city === "嘉義市") {
              this.centerChiayi();
            } else if (this.input.city === "臺南市") {
              this.centerTainan();
            } else if (this.input.city === "高雄市") {
              this.centerKaohsiung();
            } else if (this.input.city === "宜蘭縣") {
              this.centerYilan();
            } else if (this.input.city === "屏東縣") {
              this.centerPingtung();
            } else if (this.input.city === "臺東縣") {
              this.centerTaitung();
            } else if (this.input.city === "花蓮縣") {
              this.centerHualian();
            } else if (this.input.city === "澎湖縣") {
              this.centerPenghu();
            } else if (this.input.city === "金門縣") {
              this.centerKinmen();
            } else if (this.input.city === "連江縣") {
              this.centerLianjiang();
            }

            const payload = this.input.city ? this.filterItem : this.fireItems

            this.filterItem = payload.filter(item => {

              return item.名稱.toLowerCase().includes(this.input.type.toLowerCase())
            })
            if (this.input.type && this.input.city) {

              this.scrollInput = true;
              this.resultPageSwitch = true;
              this.mainSwitch = true;
              this.headerSwitch = true;
              this.mapInputSwitch = false;

              const payload = this.input.city ? this.filterItem : this.fireItems
              this.filterItem = payload.filter(item => {

                return item.名稱.toLowerCase().includes(this.input.type.toLowerCase())

              })

              for (let i = 0; i < this.filterItem.length; i++) {
                try {
                  await this.geocodeResults(
                    new google.maps.Geocoder(),
                    this.map,
                    this.filterItem[i]['名稱'],
                    this.cardBid = this.filterItem[i].bid,
                    this.cardName = this.filterItem[i].分類[0],
                  );
                } catch (e) {
                  // console.log(e)
                }

              }

            }
          }
        }
      } else {
        alert("請選擇搜尋地區/商家！！");
      }
      this.input.city = "";
      this.input.type = "";
    },
    initMap() {
      // 建立地圖
      const geocoder = new google.maps.Geocoder();
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: this.zoom,
        mapTypeId: "terrain",
        scrollwheel: true,
        draggable: true,
      });
    },
    apndWant() {
      this.map.setZoom(18);
      // set center
      this.map.panTo({
        lat: this.lat,
        lng: this.lng,
      });
    },
    centerTaichung() {
      this.map.setZoom(10);
      // set center
      this.map.panTo({
        lat: 24.203563,
        lng: 120.815762,
      });
    },
    centerTaipei() {
      this.map.setZoom(11);
      // set center
      this.map.panTo({
        lat: 25.01342704443717,
        lng: 121.5077421480818,
      });
    },
    centerKeelung() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 25.13024737978166,
        lng: 121.71453178033613,
      });
    },

    centerNewTaipei() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 25.019263476884085,
        lng: 121.45798515399174,
      });
    },

    centerHsinchu() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 24.783163254430377,
        lng: 120.96891467983303,
      });
    },

    centerTaoyuan() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 24.97881590255709,
        lng: 121.30183394268214,
      });
    },

    centerMiaoli() {
      this.map.setZoom(11);
      // set center
      this.map.panTo({
        lat: 24.524720212724862,
        lng: 120.92957833278717,
      });
    },

    centerChanghua() {
      this.map.setZoom(10);
      // set center
      this.map.panTo({
        lat: 24.072259702436142,
        lng: 120.56214638336897,
      });
    },

    centerNantou() {
      this.map.setZoom(10);
      // set center
      this.map.panTo({
        lat: 23.9598681696431,
        lng: 120.96737509005148,
      });
    },

    centerYunlin() {
      this.map.setZoom(10);
      // set center
      this.map.panTo({
        lat: 23.709471251149726,
        lng: 120.43114942622738,
      });
    },

    centerChiayi() {
      this.map.setZoom(10);
      // set center
      this.map.panTo({
        lat: 23.480213155381385,
        lng: 120.44981086026924,
      });
    },

    centerTainan() {
      this.map.setZoom(11);
      // set center
      this.map.panTo({
        lat: 23.020971253671032,
        lng: 120.23910262568711,
      });
    },

    centerKaohsiung() {
      this.map.setZoom(11);
      // set center
      this.map.panTo({
        lat: 22.70781767054878,
        lng: 120.42636251811521,
      });
    },

    centerYilan() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 24.75898769892964,
        lng: 121.75417290644114,
      });
    },

    centerPingtung() {
      this.map.setZoom(10);
      // set center
      this.map.panTo({
        lat: 22.39835510975535,
        lng: 120.59336270561138,
      });
    },

    centerTaitung() {
      this.map.setZoom(12);
      // set center
      this.map.panTo({
        lat: 22.755099550644907,
        lng: 121.11463582753126,
      });
    },

    centerHualian() {
      this.map.setZoom(11);
      // set center
      this.map.panTo({
        lat: 23.933224343882262,
        lng: 121.53432448965427,
      });
    },

    centerPenghu() {
      this.map.setZoom(14);
      // set center
      this.map.panTo({
        lat: 23.567330262320535,
        lng: 119.61893011644446,
      });
    },

    centerKinmen() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 24.45189152006177,
        lng: 118.37799372839537,
      });
    },

    centerLianjiang() {
      this.map.setZoom(13);
      // set center
      this.map.panTo({
        lat: 26.153284931882,
        lng: 119.93086207497007,
      });
    },
    // 顯示地圖時各縣市定位 end

    deleteMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
    geocodeResults(geocoder, resultsMap, address) {
      return new Promise((resolve, reject) => {
        geocoder.geocode({
            address: address,
            componentRestrictions: {
              country: "TW",
            },
          },

          (results, status) => {
            if (status === "OK") {
              results.forEach((res) => {
                const marker = new google.maps.Marker({
                  map: resultsMap,
                  position: res.geometry.location,
                  animation: google.maps.Animation.DROP,

                });
                this.lat = res.geometry.location.lat();
                this.lng = res.geometry.location.lng();
                // console.log(res.geometry.location.lng());
                // console.log(res.geometry.location.lat());
                // console.log(this.lat);
                this.markers.push(marker);
                const infowindow = new google.maps.InfoWindow({
                  // 設定想要顯示的內容
                  content: `
                    <div id="map-card">
                    <div class="map-img-box">
                        <img src="https://www.shop1688.com.tw/${this.cardBid}/item.jpg"> 
                    </div>
                    <h1>${address}</h1>
                    <p>${this.cardName}</p>
                    <button class="shop-hot-button">
                      <a href="https://www.google.com/maps/place/${this.lat},${this.lng}" target="_blank"> 導航至此 </a>
                    </button>
                  </div>
                     `,
                  // 設定訊息視窗最大寬度
                  maxWidth: 200,
                });
                // 在地標上監聽點擊事件
                marker.addListener("click", () => {
                  // this.centerHualian();
                  // 指定在哪個地圖和地標上開啟訊息視窗
                  if (this.infowindow) this.infowindow.close();
                  infowindow.open(this.map, marker);
                  this.infowindow = infowindow;
                });
              });
              setTimeout(() => {
                resolve(results);
              }, 700);
            } else {
              // alert(
              //   "Geocode was not successful for the following reason: " + status
              // );
              reject(status);
            }
          }
        );
      });
    }
  },

  mounted() {
    document.addEventListener('scroll', this.onScroll);

    let draggableArea = document.querySelector('.draggableArea');
    let sectionDraggable = document.querySelector('.sectionDraggable');
    const header = document.querySelector('.header');
    const headerRect = header.getBoundingClientRect();
    // console.log(headerRect.width);
    if (headerRect.width <= 770) {
      this.webBtnSearch = "搜尋";
    }

    if (headerRect.width >= 770) {
      Draggable.create('#square5', {
        bounds: draggableArea,
        dragClickables: false,
        type: 'x,y',
        zIndex: -2000,
        // radius: 15,
      })
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

    }


    if (headerRect.width <= 770) {
      Draggable.create("#square6", {
        bounds: draggableArea,
        dragClickables: true,
        type: 'x,y',
        // radius: 15,
      })
    }
    Draggable.create('#square7', {
      bounds: draggableArea,
      dragClickables: true,
      type: 'x,y',
      // radius: 15,
    })
    Draggable.create('#square8', {
      bounds: sectionDraggable,
      dragClickables: true,
      type: 'x,y',

      // radius: 15,
    })
  },

  // 創建完成時
  created() {
    window.addEventListener("load", () => {
      this.initMap();
      this.fireData();
      this.nowTimes();
      this.onScroll();
      this.resizeAll();

    });
  },
})