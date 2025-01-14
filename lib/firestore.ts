import * as admin from "firebase-admin";

var serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

export { firestore };
