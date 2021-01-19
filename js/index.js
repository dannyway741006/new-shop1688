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

new Vue({
  el: '#app',
  data: {
    linkActive_no: true,
    isActive: true,
    scrollActive: false,
    inputSmall: false,
    inputBig: true,
    linkActive: false,
    typeActive: false,
    cityActive: false,
    searchActive: false,
    allInputActive: true,
    cityActive_block: false,
    searchActive_block: false,
    cityShadowActive: false,
    typeShadowActive: false,
    citybackground: false,
    typebackground: false,
    searchPadding: false,
    controlType: false,
    mapSwitch: true,
    allNavHeight: false,
    allNavClose: true,
    maskMove: true,
    navBarY: false,
    navBar0: true,
    onlyBg: false,
    logo: false,
    iconMap: {
      "旅遊美食": 'food.svg',
      "交通運輸": 'car.svg',
      "商業學術": 'Furniture.svg',
      "生活服務": 'life.svg',
      "居家裝潢": 'medical.svg',
      "醫療保健": 'ser.svg',
      "工商服務": 'user-graduate-solid.svg',
    },
    localCity: [],
    newTypeData: [],
    typeData,
    cityData,
    typeTitle: '無',
    cityTitle: '',
    filterItem: [],
    filterItemMap: [],
    fireItems: [],
    allTitle: [],
    resultCity: [],
    cardName: [],
    cardBid: [],

    input: {
      type: '',
      city: '',
      shop: '搜尋商家',
    },
    searchMsg: '',
    map: null,
    lat: 25.0325917,
    lng: 121.5624999,
    zoom: 7,
    markers: [],
    infowindow: null,
  },
  computed: {

    titleMenu() {

      const value = this.input.type.toLowerCase();
      if (value === "旅遊美食" || value === "交通運輸" || value === "居家裝潢" || value === "醫療保健" || value === "工商服務" || value === "生活服務" || value === "商業學術") {
        return this.typeData;
        // this.searchPadding = false;
      }

      if (value) {
        return this.allTitle.filter(item => {
          return item.toLowerCase().indexOf(value) !== -1;
          //this.searchPadding = false;
        })

      } else {
        //this.searchPadding = false;
        return this.typeData;
      }

    },
  },

  mounted() {
    document.addEventListener('scroll', this.onScroll)
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    dosomething(e) {
      e.currentTarget.src = "https://storage.googleapis.com/alleynail.co/new_shop1688_1231/img/shop_item.svg"
    },
    onScroll() {
      const scrollTop =
        document.documentElement.scrollTop + document.body.scrollTop;
      let Y;
      Y = Math.floor(window.pageYOffset);
      console.log(Y);
      if (scrollTop < 5) {
        this.logo = false;

        this.allNavClose = true;
        this.allNavHeight = false;
        this.scrollActive = true;
        this.inputSmall = true;
        this.inputBig = false;
        this.linkActive = true;
        this.linkActive_no = false;
        this.cityActive = false;
        this.navBarY = false;
        this.navBar0 = true;
        this.onlyBg = false;
        if (!this.controlType) {
          // this.onlyBg = true;
          this.logo = false;
          console.log("aaaaadddd");
        } else {
          console.log("asdfasdf");
          this.logo = true;

        }
        if (this.input.type || this.input.city) {
          this.typeActive = true;
        }

        if (this.mapSwitch === false) {
          this.typeActive = false;
          this.scrollActive = false;
          this.inputSmall = false;
          this.inputBig = true;
          this.linkActive = false;
          this.linkActive_no = true;
          this.cityActive = true;
          this.allNavClose = false;
          this.allNavHeight = true;
          this.navBar0 = false;
          this.navBarY = true;

        }
      } else {
        this.navBar0 = false;
        this.navBarY = true;
        this.allNavClose = false;
        this.allNavHeight = true;

        this.typeActive = false;
        this.scrollActive = false;
        this.inputSmall = false;
        this.inputBig = true;
        this.linkActive = false;
        this.linkActive_no = true;
        this.cityActive = true;

        this.logo = true;

      }
    },
    removeMask() {
      this.cityShadowActive = false;
      this.typeShadowActive = false;
      this.maskMove = true;
      this.allNavClose = false;
      this.allNavHeight = true;

      this.typeActive = false;
      this.scrollActive = false;
      this.inputSmall = false;
      this.inputBig = true;
      this.linkActive = false;
      this.linkActive_no = true;
      this.cityActive = true;

      this.navBar0 = false;
      this.navBarY = true;


      if (this.input.type === "" && this.input.city === "") {
        this.typeActive = false;
        this.cityActive_block = false;
        this.allInputActive = true;
        this.searchActive_block = false;
        this.searchActive = true;

      } else if (this.input.type === "" || this.input.city === "") {
        this.cityActive_block = false;
        this.searchActive = true;
        this.searchActive_block = false;
      } else if (this.input.type && this.input.city) {
        this.cityActive_block = false;
        this.searchActive_block = false;
        this.searchActive = true;
      }
    },
    reduction() {
      this.cityActive = false;
      this.scrollActive = true;
      this.inputSmall = true;
      this.inputBig = false;
      this.linkActive_no = false;
      this.linkActive = true;
      this.allNavClose = true;
      this.allNavHeight = false;
      this.maskMove = false;
      this.searchActive = false;
      this.searchActive_block = true;
      this.typeActive = true;
      this.navBarY = false;
      this.navBar0 = true;
      this.onlyBg = true;
      // if (this.input.type || this.input.city) {
      //   this.typeActive = true;
      // }
    },

    cityBox() {
      this.searchActive = true;
      this.cityActive = false;
      this.cityActive_block = true;
      this.allInputActive = false;
      this.typeActive = true;
      this.searchActive_block = false;
      this.cityShadowActive = true;
      this.typeShadowActive = false;

    },

    TypeBox() {
      this.searchActive = false;
      this.cityActive = false;
      this.searchActive_block = true;
      this.allInputActive = true;
      this.typeActive = true;
      this.cityActive_block = false;
      this.cityShadowActive = false;
      this.typeShadowActive = true;


    },
    addStyle() {
      this.allInputActive = false;
      this.typeActive = true;
    },
    removeStyle() {
      this.cityShadowActive = false;
      this.typeShadowActive = false;

      // if (this.mapSwitch === false) {
      //   this.typeActive = false;
      //   this.scrollActive = false;
      //   this.inputSmall = false;
      //   this.inputBig = true;
      //   this.linkActive = false;
      //   this.linkActive_no = true;
      //   this.cityActive = true;
      // }



      if (this.input.type === "" && this.input.city === "") {
        this.typeActive = false;
        this.cityActive_block = false;
        this.allInputActive = true;
        this.searchActive_block = false;
        this.searchActive = true;

      } else if (this.input.type === "" || this.input.city === "") {
        this.cityActive_block = false;
        this.searchActive = true;
        this.searchActive_block = false;
      } else if (this.input.type && this.input.city) {
        this.cityActive_block = false;
        this.searchActive_block = false;
        this.searchActive = true;
      }
    },

    fireData() {
      db.collection('shop1688web')
        // .limit(1847)
        .get()
        .then(querySnapshot => {
          // let i = 1;
          querySnapshot.forEach(doc => {
            // console.log(i++)
            // console.log(i++, doc.data().bid);
            this.fireItems.push(doc.data());
            this.allTitle.push(doc.data().名稱);

          });
        })
    },
    // localMounted() {
    //   if (localStorage.name) {
    //     this.input.city = localStorage.name;
    //   }
    // },
    // test() {
    //   if (this.cityData.includes(localStorage.name))
    //     console.log(this.filterItemMap);
    //   this.filterItemMap = this.fireItems.filter(item => {
    //     item['地址'].includes(localStorage.name);
    //   })

    // },
    //需加強！//
    food() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[0]);
      })
    },
    car() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[1]);
      })
    },
    academic() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[2]);
      })
    },
    serivce() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[3]);
      })
    },
    home() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[4]);
      })
    },
    medical() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[5]);
      })
    },
    business() {
      this.filterItem = this.fireItems.filter(item => {
        return item.分類[0].includes(this.typeData[6]);
      })
    },
    //需加強！ end//

    async search() {
      this.deleteMarkers();
      this.typeTitle = this.input.type;
      this.cityTitle = this.input.city;
      // localStorage.name = this.input.city;
      this.maskMove = true;

      this.filterItem = this.fireItems.filter(item => {
        return item.名稱.toLowerCase() === this.input.type.toLowerCase()
      })



      if (this.filterItem.length) {
        this.controlType = true;
        this.mapSwitch = false;
        for (let i = 0; i < this.filterItem.length; i++) {
          try {
            await this.geocodeResults(
              new google.maps.Geocoder(),
              this.map,
              this.filterItem[i]['名稱'],
              this.cardBid = this.filterItem[i].bid,
              this.cardName = this.filterItem[i].分類[0],
              this.apndWant(),
            );
            console.log(this.apndWant());
          } catch (e) {
            console.log(e)
          }
        }
      } else {
        if (!this.controlType) {
          // this.onlyBg = true;
          // this.logo = true;
          console.log("aaaaadddd");
        } else {
          console.log("asdfasdf");
          this.logo = true;
          this.onlyBg = false;
        }
        if (this.input.city) {
          this.controlType = false;
          this.mapSwitch = true;


          this.filterItem = this.fireItems.filter(item => {
            return item['地址'].includes(this.input.city);
          })
        }
        if (this.typeData.includes(this.input.type)) {
          this.controlType = false;
          this.mapSwitch = true;
          const shopload = this.input.city ? this.filterItem : this.fireItems
          this.filterItem = shopload.filter(item => {
            return item.分類[0].includes(this.input.type);
          })
          if (this.input.type && this.input.city) {
            this.controlType = true;
            this.mapSwitch = false;
            // searchbar
            this.typeActive = false;
            this.scrollActive = false;
            this.inputSmall = false;
            this.inputBig = true;
            this.linkActive = false;
            this.linkActive_no = true;
            this.cityActive = true;

            this.allNavClose = false;
            this.allNavHeight = true;

            // searchbar end
            this.navBar0 = false;
            this.navBarY = true;
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
                console.log(e)
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
          this.controlType = false;
          this.mapSwitch = true;
          const payload = this.input.city ? this.filterItem : this.fireItems
          this.filterItem = payload.filter(item => {
            return item.名稱.toLowerCase().includes(this.input.type.toLowerCase())
          })
          if (this.input.type && this.input.city) {

            this.controlType = true;
            this.mapSwitch = false;
            // searchbar
            this.typeActive = false;
            this.scrollActive = false;
            this.inputSmall = false;
            this.inputBig = true;
            this.linkActive = false;
            this.linkActive_no = true;
            this.cityActive = true;

            this.allNavClose = false;
            this.allNavHeight = true;
            // searchbar end
            this.navBar0 = false;
            this.navBarY = true;

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
                console.log(e)
              }
            }
          }
        }
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
      // let markers = new google.maps.Marker({
      //   position: this.location,
      //   map: this.map
      // });

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

    // 顯非地圖時各縣市定位 end
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
                console.log(res.geometry.location.lng());
                console.log(res.geometry.location.lat());
                console.log(this.lat);
                this.markers.push(marker);
                const infowindow = new google.maps.InfoWindow({
                  // 設定想要顯示的內容
                  content: `
                       <div id="testmapcard">
                          <p>${address}</p>
                          <h1>${this.cardName}</h1>
                          <a href="https://www.google.com.tw/maps/place/${address}" target="_blank"> 導航至此 </a>
                          <a href="https://www.google.com/maps/place/${this.lat},${this.lng}" target="_blank"> 導航至此 </a>
                          <p></p>
                          <img  src="https://www.shop1688.com.tw/${this.cardBid}/item.jpg">
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

  created() {

    window.addEventListener("load", () => {
      this.fireData();
      this.initMap();
      this.onScroll();
      // this.localMounted();
      // this.test();
    });
  },
})