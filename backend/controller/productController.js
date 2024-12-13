const productModel = require("../models/productModel");

//createoder - /ai/p1/products
exports.getProduct = async (req, res, next) => {
  const query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await productModel.find(query);
  res.json({
    sucess: true,
    message: "product get Success",
    products,
  });
};

//createoder - /ai/p1/products/:id
exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json({
      sucess: true,
      message: "product id get Success",
      product,
    });
  } catch (err) {
    res.status(404).json({
      sucess: true,
      message: "No Id found",
    });
  }
};
