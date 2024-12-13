const OrderModel = require("../models/OrderModel");
const productModel = require("../models/productModel");

//createoder - /ai/p1/order
exports.getOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0)
  ).toFixed(2);
  const status = "pending";
  const order = await OrderModel.create({ cartItems, amount, status });

  cartItems.forEach(async (item) => {
    const product = await productModel.findById(item.product._id);
    product.stock -= item.qty;
    await product.save();
  });
  res.json({
    sucess: true,
    message: "Order Success ",
    order,
  });
};
