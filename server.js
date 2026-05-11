import admin from "./firebase.js";
import express from "express";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ Error: "email name and password required" });
    }

    const userRecord = await admin.auth().createUser({
      displayName: name,
      email,
      password,
    });
    res.status(200).json({
      message: "user created successfully",
      uid: userRecord.uid,
      name: userRecord.displayName,
      password: userRecord.passwordHash,
      email: userRecord.email,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      err: err.message,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers(1000);
    const user = listUsers.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      password: user.passwordHash,
      name: user.displayName,
      createdAt: user.metadata.creationTime,
    }));
    res.status(201).json({
      sucess: true,
      totalUsers: user.length,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
});

app.delete("/users/:uid", async (req, res) => {
  try {
    await admin.auth().deleteUser(req.params.uid);
    res.json({ message: "user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});   
 app.patch("/update-user/:uid", async (req, res) => {
  try {
    const { uid, email, password, displayName } = req.body;

    const updatedUser = await admin.auth().updateUser(uid, {
      email: email,           
      password: password,     
      displayName: displayName, 
    });

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


const API = 3000;

app.listen(API, () => {
  console.log(`server is running on port http://localhost:${API}`);
});
