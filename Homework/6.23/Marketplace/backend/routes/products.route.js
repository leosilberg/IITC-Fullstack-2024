const express = require("express");

const router = express.Router();

const {
  getProductById,
  getProducts,
} = require("../controllers/products.controller.js");

router.get("/", getProducts);
router.get("/:id", getProductById);
module.exports = router;
