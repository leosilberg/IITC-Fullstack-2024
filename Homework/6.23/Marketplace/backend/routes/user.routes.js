const express = require("express");
const { model } = require("mongoose");
const { getUserById, getUserProducts, deleteProduct, createProduct, editProduct } = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/",getUserById);
router.get("/products",getUserProducts)
router.delete("/products/:id", deleteProduct);
router.post("/products", createProduct);
router.patch("/products/:id", editProduct);

module.exports = router;
