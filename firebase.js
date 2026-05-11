import serviceAccount from "./serviceAccount.json" with { type: "json" };
import admin from "firebase-admin"
const admin = require('firebase-admin');

// 1. Fix the private key newline issue first
const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
  : undefined;

// 2. Initialize the app with the cleaned key
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}); console.log("database connected...")
export default admin;