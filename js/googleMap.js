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


const googleMap = new Vue({
  el: '#app',
  data: {
    map: null,
    fireItems: [],
    allTitle: [],
    test: ["桃園市"],

  },
  methods: {
    fireData() {
      db.collection('shop1688web')
        // .limit(40)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.fireItems.push(doc.data());
            this.allTitle.push(doc.data().名稱);
          });
        })
    },
    // init google map
    initMap() {
      let geocoder = new google.maps.Geocoder();
      let location = {
        lat: 25.0374865,
        lng: 121.5647688
      };

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 16,
        mapTypeId: 'terrain'
      });

      fetch('../json/googleMap.geojson')
        .then(results => results.json())
        .then(result => {
          let res = result.features;
          Array.prototype.forEach.call(res, r => {
            let latLng = new google.maps.LatLng(r.geometry.coordinates[0], r.geometry.coordinates[1]);
            let marker = new google.maps.Marker({
              position: latLng,
              map: this.map
            });
          });
        });
    },
    deleteMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
  },

  geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    console.log(address);
    geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      } else {
        alert(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  },
  created() {
    window.addEventListener('load', () => {
      this.initMap();
      this.fireData();
    });
  },


});


// const geocoder = new google.maps.Geocoder();
// document.getElementById("search").addEventListener("click", () => {

//   geocodeAddress(geocoder, map);
// });