// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBexAK4vaD3pg21hDqcRv8glk7M8W55IIs",
  authDomain: "toutclout-cff52.firebaseapp.com",
  projectId: "toutclout-cff52",
  storageBucket: "toutclout-cff52.appspot.com",
  messagingSenderId: "611266140288",
  appId: "1:611266140288:web:32c4a5c96e25851ac06e65",
  measurementId: "G-HKFH9CQE21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the databse into action
const db = getFirestore(app);

async function getEnquiries(db) {
  const enquiriesCol = collection(db, "enquiries");
  const enquirySnapshot = await getDocs(enquiriesCol);
  const enquiryList = await enquirySnapshot.docs.map((doc) => doc.data());
  return enquiryList;
}

async function insertEnquiries(db, data) {
  const docRef = await addDoc(collection(db, "enquiries"), data);
  return new Promise((resolve, reject) => {
    resolve(docRef.id);
  });
}

// Vue app handling the form field
var vueApp = new Vue({
  el: "#contact-form",
  data() {
    return {
      name: "",
      message: "",
      email: "",
      phone: "",
      emailSending: false,
    };
  },
  methods: {
    emailAndSaveInDatabase() {
      this.emailSending = true;
      insertEnquiries(db, {
        name: this.name,
        email: this.email,
        message: this.message,
        phone: this.phone,
        timestamp: serverTimestamp(),
      }).then(() => {
        this.emailSending = false;
      });
    },
  },
});
