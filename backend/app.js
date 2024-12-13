const express = require("express");

const app = express();
const dot_env = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/ConnectDatabase");
const cors = require("cors");
dot_env.config({ path: path.join(__dirname, "config", "config.env") });

app.listen(process.env.PORT, () => {
  console.log(`Connected to ${process.env.PORT}`);
});
const products = require("./routes/product");
const orders = require("./routes/order");

connectDatabase();
app.use(express.json());
app.use(cors());
app.use("/api/p1/", products);
app.use("/api/p1/", orders);
