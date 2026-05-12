import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { buildDashboardData } from "../functions/src/demoData";

const firebaseConfig = {
  apiKey: "AIzaSyBh4YZlOcCbIXfqqhW-1zp8a5I0NCZjHf8",
  authDomain: "dashboard-automotivo-firebase.firebaseapp.com",
  projectId: "dashboard-automotivo-firebase",
  storageBucket: "dashboard-automotivo-firebase.firebasestorage.app",
  messagingSenderId: "853137075091",
  appId: "1:853137075091:web:0e6ccea155b081ac105666",
  measurementId: "G-9SH8QCY5H5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
  const data = buildDashboardData();
  await setDoc(doc(db, "dashboard", "current"), data);
  console.log("OK - Dados enviados para dashboard/current");
}

main();
