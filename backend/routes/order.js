const express = require("express");
const { getOrder } = require("../controller/OrderController");

const router = express.Router();

router.route("/orders").post(getOrder);

module.exports = router;
