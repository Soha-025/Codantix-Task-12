import Order from "../models/Order.js";
import Product from "../models/Product.js";

// create order
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: "No order items" });

  // Optionally: reduce stock
  for (const item of orderItems) {
    const prod = await Product.findById(item.product);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.qty);
      await prod.save();
    }
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const created = await order.save();
  res.status(201).json(created);
};

// get all orders for logged in user
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("orderItems.product", "name image price");
  res.json(orders);
};

// get single order
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("orderItems.product", "name image price");
  if (!order) return res.status(404).json({ message: "Order not found" });
  // only owner can see
  if (order.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });
  res.json(order);
};
