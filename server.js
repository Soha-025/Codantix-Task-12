import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

// Product model
import Product from "./models/Product.js";

// API Routes
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// -------------------- React build serve --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../Frontend/serein-touch-frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/serein-touch-frontend/dist/index.html"));
});
// -----------------------------------------------------------

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
