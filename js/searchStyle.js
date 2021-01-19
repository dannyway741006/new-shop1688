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




     // 顯非地圖時各縣市定位 
     // centerTaichung() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.203563,
     //     lng: 120.815762,
     //   });
     // },
     // centerTaipei() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 25.01342704443717,
     //     lng: 121.5077421480818,
     //   });
     // },

     // centerKeelung() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 25.13024737978166,
     //     lng: 121.71453178033613,
     //   });
     // },

     // centerNewTaipei() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 25.019263476884085,
     //     lng: 121.45798515399174,
     //   });
     // },

     // centerHsinchu() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.783163254430377,
     //     lng: 120.96891467983303,
     //   });
     // },

     // centerTaoyuan() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.97881590255709,
     //     lng: 121.30183394268214,
     //   });
     // },

     // centerMiaoli() {
     //   this.map.setZoom(11);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.524720212724862,
     //     lng: 120.92957833278717,
     //   });
     // },

     // centerChanghua() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.072259702436142,
     //     lng: 120.56214638336897,
     //   });
     // },

     // centerNantou() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 23.9598681696431,
     //     lng: 120.96737509005148,
     //   });
     // },

     // centerYunlin() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 23.709471251149726,
     //     lng: 120.43114942622738,
     //   });
     // },

     // centerChiayi() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 23.480213155381385,
     //     lng: 120.44981086026924,
     //   });
     // },

     // centerTainan() {
     //   this.map.setZoom(11);
     //   // set center
     //   this.map.panTo({
     //     lat: 23.020971253671032,
     //     lng: 120.23910262568711,
     //   });
     // },

     // centerKaohsiung() {
     //   this.map.setZoom(11);
     //   // set center
     //   this.map.panTo({
     //     lat: 22.70781767054878,
     //     lng: 120.42636251811521,
     //   });
     // },

     // centerYilan() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.75898769892964,
     //     lng: 121.75417290644114,
     //   });
     // },

     // centerPingtung() {
     //   this.map.setZoom(10);
     //   // set center
     //   this.map.panTo({
     //     lat: 22.39835510975535,
     //     lng: 120.59336270561138,
     //   });
     // },

     // centerTaitung() {
     //   this.map.setZoom(12);
     //   // set center
     //   this.map.panTo({
     //     lat: 22.755099550644907,
     //     lng: 121.11463582753126,
     //   });
     // },

     // centerHualian() {
     //   this.map.setZoom(11);
     //   // set center
     //   this.map.panTo({
     //     lat: 23.933224343882262,
     //     lng: 121.53432448965427,
     //   });
     // },

     // centerPenghu() {
     //   this.map.setZoom(14);
     //   // set center
     //   this.map.panTo({
     //     lat: 23.567330262320535,
     //     lng: 119.61893011644446,
     //   });
     // },

     // centerKinmen() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 24.45189152006177,
     //     lng: 118.37799372839537,
     //   });
     // },

     // centerLianjiang() {
     //   this.map.setZoom(13);
     //   // set center
     //   this.map.panTo({
     //     lat: 26.153284931882,
     //     lng: 119.93086207497007,
     //   });
     // },

     // 顯非地圖時各縣市定位 end