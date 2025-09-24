const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// CRUD Routes
app.get("/tickets", async (req, res) => {
  const snapshot = await db.collection("tickets").get();
  res.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
});

app.get("/tickets/:id", async (req, res) => {
  const doc = await db.collection("tickets").doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Not found" });
  res.json({ id: doc.id, ...doc.data() });
});

app.post("/tickets", async (req, res) => {
  const ticket = req.body;
  const docRef = await db.collection("tickets").add(ticket);
  res.json({ id: docRef.id, ...ticket });
});

app.put("/tickets/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("tickets").doc(id).update(req.body);
  res.json({ id, ...req.body });
});

app.delete("/tickets/:id", async (req, res) => {
  await db.collection("tickets").doc(req.params.id).delete();
  res.json({ success: true });
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
