const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function main() {
  await db.doc("automation/status").set(
    {
      status: "funcionando",
      origem: "GitHub Actions",
      mensagem: "Automacao conectada com sucesso ao Firebase",
      atualizadoEm: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await db.collection("updateLogs").add({
    tipo: "teste-github-actions",
    status: "ok",
    criadoEm: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("OK - Automacao testada com sucesso.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
