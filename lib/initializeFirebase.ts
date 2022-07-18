import admin from 'firebase-admin';
import { inProduction } from "../config/inProduction";
import fs from "fs"
import path from "path"

if (admin.apps.length === 0) {
  if (inProduction) {

    admin.initializeApp({
      storageBucket: "pumped-kicks.appspot.com"
    })

  } else {

    const serviceAccountPath = path.join(process.cwd(), "./service-account.json")
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath).toString())

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "pumped-kicks.appspot.com"
    });
  }

}
