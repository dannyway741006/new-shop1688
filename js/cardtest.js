new Vue({
  el: '#app',
  data: {
    options: {
      enableHighAccuracy: true,
      timeout: 10000
    }
  },
  methods: {
    success(pos) {
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    },
    error(err) {
      alert(err)
    },

    getLocation2() {
      const geo = navigator.geolocation;
      geo.getCurrentPosition(this.success, this.error, this.options);
    },
  }
})