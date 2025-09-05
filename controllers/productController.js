import Product from "../models/Product.js";

// GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

// POST /api/products  (admin)
export const createProduct = async (req, res) => {
  const { name, description, price, image, stock, category } = req.body;
  const product = new Product({ name, description, price, image, stock, category });
  const created = await product.save();
  res.status(201).json(created);
};

// PUT /api/products/:id (admin)
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, description, price, image, stock, category } = req.body;
  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.image = image ?? product.image;
  product.stock = stock ?? product.stock;
  product.category = category ?? product.category;

  const updated = await product.save();
  res.json(updated);
};

// DELETE /api/products/:id (admin)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.remove();
  res.json({ message: "Product removed" });
};
