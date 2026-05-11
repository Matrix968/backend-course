import serviceAccount from "./serviceAccount.json" with { type: "json" };
import admin from "firebase-admin"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}); console.log("database connected...")
export default admin;