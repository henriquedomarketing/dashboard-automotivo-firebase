import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh4YZlOcCbIXfqqhW-1zp8a5I0NCZjHf8",
  authDomain: "dashboard-automotivo-firebase.firebaseapp.com",
  projectId: "dashboard-automotivo-firebase",
  storageBucket: "dashboard-automotivo-firebase.firebasestorage.app",
  messagingSenderId: "853137075091",
  appId: "1:853137075091:web:0e6ccea155b081ac105666",
  measurementId: "G-9SH8QCY5H5"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
