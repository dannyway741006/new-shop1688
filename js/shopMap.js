new Vue({
  el: '#shopApp',
  data: {
    newTypeData: [],
    typeData,
    cityData,
    h2Title: '',
    filterItem: [],
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
      }
      if (value) {
        let baseSearch = document.querySelector('.baseSearch');
        return this.allTitle.filter(item => {
          return item.toLowerCase().indexOf(value) !== -1
        })
      } else {
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
    onScroll() {
      const scrollTop =
        document.documentElement.scrollTop + document.body.scrollTop;

      const headerDom = this.$refs.header;
      const inputBlock = this.$refs.testblock;
      const allInput = this.$refs.allInput;
      const link = this.$refs.link;
      let Y;

      Y = Math.floor(window.pageYOffset);
      // console.log(Y);
      if (scrollTop < 160) {
        if (!inputBlock.getAttribute('class').includes('type-block')) {
          inputBlock.classList = 'inputExterior inputType';
        }
        if (!allInput.getAttribute('class').includes('allInput-w-50')) {
          allInput.classList = 'navOutLine allInput-w-50';
        }
        if (!link.getAttribute('class').includes('link-block')) {
          link.classList = 'v link-block';
        }
        if (this.input.type || this.input.city) {
          let inputExterior = document.querySelector(".inputExterior");
          inputExterior.classList.add("active-big-70");
        }
        let groupCity = document.querySelector(".group-city");
        groupCity.classList.remove('active-city-none');
        let fakeInput = document.querySelector('.fake-input');
        fakeInput.classList.add('active-fake');

      } else {
        let groupCity = document.querySelector(".group-city");
        groupCity.classList.add('active-city-none');
        let fakeInput = document.querySelector('.fake-input');
        fakeInput.classList.remove('active-fake');
        inputBlock.classList = 'inputExterior inputType';
        if (!allInput.getAttribute('class').includes('allInput-w-100')) {
          allInput.classList = 'navOutLine allInput-w-100';
        }
        if (!link.getAttribute('class').includes('link-no')) {
          link.classList = 'v link-no';
        }
      }
    },
    reduction() {

      const allInput = this.$refs.allInput;
      let groupCity = document.querySelector(".group-city");
      groupCity.classList.remove('active-city-none');
      let fakeInput = document.querySelector('.fake-input');
      fakeInput.classList.add('active-fake');
      if (!allInput.getAttribute('class').includes('allInput-w-50')) {
        allInput.classList = 'navOutLine allInput-w-50';
      }
    },

    cityBox() {
      let inputExterior = document.querySelector(".inputExterior");
      let citySearch = document.querySelector('.citySearch');
      let baseSearch = document.querySelector('.baseSearch');
      baseSearch.classList.add('active-baseSearch-none');
      citySearch.classList.remove("active-citySearch-none");
      citySearch.classList.add("active-citySearch-block");
      inputExterior.classList.remove("active-big-60");
      inputExterior.classList.add("active-big-70");
    },

    TypeBox() {

      let inputExterior = document.querySelector(".inputExterior");
      let citySearch = document.querySelector('.citySearch');
      let baseSearch = document.querySelector('.baseSearch');
      baseSearch.classList.remove('active-baseSearch-none');
      citySearch.classList.add("active-citySearch-none");
      baseSearch.classList.add('active-baseSearch-block');
      inputExterior.classList.remove("active-big-60");
      inputExterior.classList.add("active-big-70");
    },
    addStyle() {
      let inputExterior = document.querySelector(".inputExterior");
      inputExterior.classList.remove("active-big-60");
      inputExterior.classList.add("active-big-70");
    },


    removeStyle() {
      if (this.input.type === "" && this.input.city === "") {
        let inputExterior = document.querySelector(".inputExterior");
        let citySearch = document.querySelector('.citySearch');
        inputExterior.classList.remove("active-big-70");
        inputExterior.classList.add("active-big-60");
        citySearch.classList.remove("active-citySearch-block");
        citySearch.classList.add("active-citySearch-none");
        let baseSearch = document.querySelector('.baseSearch');
        baseSearch.classList.remove('active-baseSearch-block');
        baseSearch.classList.add("active-baseSearch-none");
      } else if (this.input.type === "" || this.input.city === "") {
        citySearch.classList.add("active-citySearch-none");
        citySearch.classList.remove("active-citySearch-block");
        baseSearch.classList.add("active-baseSearch-none");
        baseSearch.classList.remove('active-baseSearch-block');
      } else if (this.input.type && this.input.city) {
        citySearch.classList.remove("active-citySearch-block");
        citySearch.classList.add("active-citySearch-none");
        baseSearch.classList.remove('active-baseSearch-block');
        baseSearch.classList.add("active-baseSearch-none");
      }
    },

    fireData() {
      db.collection('shop1688web')
        .limit(400)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.fireItems.push(doc.data());
            this.allTitle.push(doc.data().名稱);
          });
        })
    },

    async search() {
      this.resetCenter();
      this.zoom = 10;
      this.deleteMarkers();
      this.h2Title = this.input.type;
      if (typeData.indexOf(this.input.type) !== -1 && cityData.indexOf(this.input.city) !== -1) {
        // if (typeData.indexOf(this.input.type) !== -1) {
        this.filterItem = this.fireItems.filter((item) => {
          return item.地址[0].indexOf(this.input.city) !== -1;
        });
        // for (let i = 0; i < this.filterItem.length; i++) {
        //   let d = this.filterItem[i];
        //   if (d.分類[0].indexOf(this.input.type) !== -1) {

        //     try {
        //       await this.geocodeResults(
        //         new google.maps.Geocoder(),
        //         this.map,
        //         d.名稱
        //       );
        //     } catch (e) {
        //       console.log('b')
        //     }
        //   }
        // }
        // for (let i = 0; i < this.resultCity.length; i++) {
        //   let d = this.resultCity[i];
        //   if (d.地址[0].indexOf(this.input.city) !== -1) {

        //     try {
        //       await this.geocodeResults(
        //         new google.maps.Geocoder(),
        //         this.map,
        //         d.名稱
        //       );
        //     } catch (e) {
        //       console.log('b')
        //     }
        //   }
        // }
        // }
        // console.log(this.resultCity);
        // this.filterItem = this.resultCity.filter((item) => {
        //   return item.分類[0].indexOf(this.input.type) !== -1;
        // });
        //  else {
        //   this.resultCity = this.fireItems.filter((item) => {
        //     return item.名稱.toLowerCase().indexOf(this.input.type) !== -1;
        //   })
        // }


        // if (cityData.indexOf(this.input.city) !== -1) {
        //   this.filterItem = this.resultCity.filter((item) => {
        //     return item.地址[0].indexOf(this.input.city) !== -1;
        //   });
        //   for (let i = 0; i < this.filterItem.length; i++) {
        //     let d = this.filterItem[i];
        //     if (d.地址[0].indexOf(this.input.city) !== -1) {

        //       try {
        //         await this.geocodeResults(
        //           new google.maps.Geocoder(),
        //           this.map,
        //           d.名稱
        //         );
        //       } catch (e) {
        //         console.log('b')
        //       }
        //     }
        //   }
        //   // this.filterItem.forEach((d) => {
        //   //   if (d.地址[0].indexOf(this.input.city) !== -1) {
        //   //     this.geocodeResults(new google.maps.Geocoder(), this.map, d.名稱);
        //   //   }
        //   // });
        // }
      }
      //  else if (this.input.type.toLowerCase() && this.input.city === "") {
      //   if (typeData.indexOf(this.input.type) !== -1) {
      //     this.filterItem = this.fireItems.filter((item) => {
      //       return item.分類[0].indexOf(this.input.type) !== -1;
      //     });
      //     for (let i = 0; i < this.filterItem.length; i++) {
      //       let d = this.filterItem[i];
      //       if (d.分類[0].indexOf(this.input.type) !== -1) {

      //         try {
      //           await this.geocodeResults(
      //             new google.maps.Geocoder(),
      //             this.map,
      //             d.名稱
      //           );
      //         } catch (e) {
      //           console.log('b')
      //         }
      //       }
      //     }

      //     // this.filterItem.forEach((d) => {
      //     //   if (d.分類[0].indexOf(this.input.type) !== -1) {
      //     //     this.geocodeResults(new google.maps.Geocoder(), this.map, d.名稱);
      //     //   }
      //     // });
      //   } else {
      //     this.filterItem = this.fireItems.filter((item) => {
      //       return (
      //         item.名稱.toLowerCase().indexOf(this.input.type.toLowerCase()) !==
      //         -1
      //       );
      //     });
      //     for (let i = 0; i < this.filterItem.length; i++) {
      //       let d = this.filterItem[i];
      //       if (d.名稱.toLowerCase().indexOf(this.input.type.toLowerCase()) !== -1) {

      //         try {
      //           await this.geocodeResults(
      //             new google.maps.Geocoder(),
      //             this.map,
      //             d.名稱
      //           );
      //         } catch (e) {
      //           console.log('b')
      //         }
      //       }
      //     }
      //     // this.filterItem.forEach((d) => {
      //     //   if (
      //     //     d.名稱.toLowerCase().indexOf(this.input.type.toLowerCase()) !== -1
      //     //   ) {
      //     //     this.geocodeResults(new google.maps.Geocoder(), this.map, d.名稱);
      //     //   }
      //     // });
      //   }
      // } 
      // else if (this.input.type === "" && this.input.city) {
      //   if (cityData.indexOf(this.input.city) !== -1) {
      //     this.filterItem = this.fireItems.filter((item) => {
      //       if (item.地址.length) {
      //         return item.地址[0].indexOf(this.input.city) !== -1;
      //       }
      //     });

      //     for (let i = 0; i < this.filterItem.length; i++) {
      //       let d = this.filterItem[i];
      //       if (d.地址[0].indexOf(this.input.city) !== -1) {
      //         this.cardName = d.分類[0];
      //         this.cardBid = d.bid;
      //         console.log(d.bid);
      //         try {
      //           await this.geocodeResults(
      //             new google.maps.Geocoder(),
      //             this.map,
      //             d.名稱
      //           );
      //         } catch (e) {
      //           console.log('b')
      //         }
      //       }
      //     }
      //   }
      // }
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

    resetCenter() {
      // set center
      this.map.panTo({
        lat: 24.203563,
        lng: 120.815762,
        zoom: this.zoom,
      });

    },
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
                  icon: {
                    url: "./img/bomb-solid.svg",
                    scaledSize: new google.maps.Size(30, 30)
                  }
                });
                this.markers.push(marker);
                const infowindow = new google.maps.InfoWindow({
                  // 設定想要顯示的內容
                  content: `<section id="all_product">
                        <div class="bidBox">
                          <p>${address}</p>
                          <h1>${this.cardName}</h1>
                          <img src="https://www.shop1688.com.tw/${this.cardBid}/item.jpg">
                        </div>
                      </section>`,
                  // 設定訊息視窗最大寬度
                  maxWidth: 200,
                });
                // 在地標上監聽點擊事件
                marker.addListener("click", () => {

                  // 指定在哪個地圖和地標上開啟訊息視窗
                  if (this.infowindow) this.infowindow.close();
                  infowindow.open(this.map, marker);
                  this.infowindow = infowindow;
                });
              });
              setTimeout(() => {
                resolve(results);
              }, 750);
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

    });
  },
})