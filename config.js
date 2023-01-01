

import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDo-Z1VI-6DAwf_p8Rs9Hdp8u6GVpZ9KwY",
  authDomain: "e-library-app-86d9d.firebaseapp.com",
  projectId: "e-library-app-86d9d",
  storageBucket: "e-library-app-86d9d.appspot.com",
  messagingSenderId: "538727668146",
  appId: "1:538727668146:web:d440f9d178f3ac423e6cab"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();