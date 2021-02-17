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


new Vue({
  el: "#app",
  data: {
    fireItems: [],
    allShop: [],
    latestDoc: null,
    isDisabl: false,
  },

  methods: {
    onScroll() {
      console.log('scrolling');
      let container = document.querySelector('.header');

      let triggerHeight = container.scrollTop + container.offsetHeight;
      if (triggerHeight >= container.scrollHeight) {
        this.fireData();
      }

    },

    async fireData() {
      const ref = db.collection('shop1688web')
        .orderBy('bid')
        .startAfter(this.latestDoc || 0)
        .limit(12)
      const data = await ref.get();
      data.docs.forEach(doc => {
        console.log('review');
        this.fireItems.push(doc.data());
      });
      this.latestDoc = data.docs[data.docs.length - 1];
      if (data.empty) {
        let container = document.querySelector('.header');
        container.removeEventListener('scroll', this.onScroll);
        this.isDisabl = true;

      } else {
        this.isDisabl = false;
      }
    },
  },
  mounted() {
    let container = document.querySelector('.header');
    container.addEventListener('scroll', this.onScroll);
  },

  created() {

    window.addEventListener("load", () => {

      this.fireData();
      // this.onScroll();
    });
  },
})

// const container = document.querySelector('.header');
// const word = document.querySelector('.word');
// let latestDoc = null;

// const getNextReviews = async () => {
//   word.classList.add('active');

//   const ref = db.collection('shop1688web')
//     .orderBy('bid')
//     .startAfter(latestDoc || 0)
//     .limit(100);

//   const data = await ref.get();

//   // output docs
//   let template = '';
//   data.docs.forEach(doc => {
//     const review = doc.data();
//     console.log('review')
//     template += `
//     <div class= "card"><h2>${review.名稱}</h2>`
//   });

//   container.innerHTML += template;
//   latestDoc = data.docs[data.docs.length - 1];
//   word.classList.remove('active');
//   if (data.empty) {
//     // loadMore.removeEventListener('click', handleClick);
//     container.removeEventListener('scroll', handleScroll);
//   }
// }

// window.addEventListener('DOMContentLoaded', () => getNextReviews());

// // load more button
// // const loadMore = document.querySelector('.load_more button');
// // const handleClick = () => {
// //   getNextReviews();
// // }
// // loadMore.addEventListener('click', handleClick);

// // load more docs(scroll)

// const handleScroll = () => {
//   let triggerHeight = container.scrollTop + container.offsetHeight;
//   if (triggerHeight >= container.scrollHeight) {
//     getNextReviews();
//   }
// }

// container.addEventListener('scroll', handleScroll);