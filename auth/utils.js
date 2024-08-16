import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore,
        doc,
        setDoc,
        getDoc,
        onSnapshot,

 } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
 import { getStorage,
            ref,
            uploadBytes,
            getDownloadURL, 
  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyBg_lFXUlrV9glLuyiuBhOSurPTaYN-ysk",
//   authDomain: "hakathon-c2215.firebaseapp.com",
//   projectId: "hakathon-c2215",
//   storageBucket: "hakathon-c2215.appspot.com",
//   messagingSenderId: "91681062186",
//   appId: "1:91681062186:web:3a37628dca0b85740b7253",
//   measurementId: "G-DPJPC72TXC",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDEKxwqlYpJ2jaGOBILlDzq8sMmmaCr0Ow",
  authDomain: "hackaton-230ce.firebaseapp.com",
  projectId: "hackaton-230ce",
  storageBucket: "hackaton-230ce.appspot.com",
  messagingSenderId: "1084809814176",
  appId: "1:1084809814176:web:43ed2a6657d6f33eeb29c5",
  measurementId: "G-T9DED4201D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
    db,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
};
