import * as admin from "firebase-admin";
import { buildDashboardData } from "./demoData";

admin.initializeApp();

async function main() {
  const db = admin.firestore();
  const payload = buildDashboardData();

  await db.collection("dashboard").doc("current").set(payload, { merge: true });
  await db.collection("updateLogs").add({
    status: "success",
    message: "Seed inicial enviado",
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log("Dados iniciais enviados para dashboard/current");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

