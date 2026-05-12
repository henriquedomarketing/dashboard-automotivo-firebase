import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const testeAutomacaoDiaria = onSchedule(
  {
    schedule: "0 6 * * *",
    timeZone: "America/Sao_Paulo",
  },
  async () => {
    await db.doc("automation/status").set(
      {
        status: "funcionando",
        mensagem: "Automacao diaria ativa",
        ultimaExecucao: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await db.collection("updateLogs").add({
      tipo: "testeAutomacaoDiaria",
      status: "ok",
      criadoEm: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
);
