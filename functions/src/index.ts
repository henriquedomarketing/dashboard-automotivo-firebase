import { onSchedule } from "firebase-functions/v2/scheduler";
import { setGlobalOptions } from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { collectMarketData } from "./collectors";

admin.initializeApp();
setGlobalOptions({ region: "southamerica-east1" });

export const updateMarketDaily = onSchedule(
  {
    schedule: "0 6 * * *",
    timeZone: "America/Sao_Paulo"
  },
  async () => {
    const db = admin.firestore();
    const payload = await collectMarketData();

    await db.collection("dashboard").doc("current").set(payload, { merge: true });

    await db.collection("updateLogs").add({
      status: "success",
      message: "Dashboard atualizado automaticamente",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
);

