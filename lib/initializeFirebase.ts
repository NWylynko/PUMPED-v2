import admin from 'firebase-admin';
import serviceAccount from "../service-account.json";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    storageBucket: "pumped-kicks.appspot.com"
  });
}
