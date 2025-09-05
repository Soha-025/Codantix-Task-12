import express from "express";
const router = express.Router();

const products = [
  { id: 1, name: "Gold Necklace", price: 25000, description: "Elegant 22K gold necklace." },
  { id: 2, name: "Diamond Ring", price: 45000, description: "Beautiful diamond-studded ring." },
  { id: 3, name: "Silver Bracelet", price: 8000, description: "Stylish 925 sterling silver bracelet." },
];

router.get("/", (req, res) => {
  res.json(products);
});

export default router;
