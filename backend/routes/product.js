const express = require("express");
const {
  getProduct,
  getOneProduct,
} = require("../controller/productController");

const router = express.Router();

router.route("/products").get(getProduct);
router.route("/Products/:id").get(getOneProduct);

module.exports = router;
