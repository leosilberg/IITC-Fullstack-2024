const { Types } = require("mongoose");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");

async function getUserById(req, res) {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.log(`user.controller: `, error);
    res.status(500).json({ message: error.message });
  }
}

async function getUserProducts(req, res) {
  const { userId } = req;
  console.log(`user.controller: `, userId);
  try {
    const products = await Product.find({ user: userId });
    console.log(`user.controller: `, products);
    res.status(200).json(products);
  } catch (error) {
    console.log(`user.controller: `, error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const { userId } = req;
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedProduct) {
      console.log(
        `product.controller, deleteProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.log(
      `product.controller, deleteProduct. Error while deleting product with id: ${id}`
    );
    res.status(500).json({ message: err.message });
  }
}

async function createProduct(req, res) {
  const newProduct = Product({ ...req.body, user: req.userId });

  try {
    const savedProduct = await newProduct.save();
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { products: savedProduct._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error
      console.log(`products.controller, createProduct. ${error.message}`);
      res.status(400).json({ message: error.message });
    } else {
      // Other types of errors
      console.log(`products.controller, createProduct. ${error.message}`);
      res.status(500).json({ message: "Server error while creating products" });
    }
  }
}

async function editProduct(req, res) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      console.log(
        `product.controller, updateProduct`,
        ` Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(`products.controller:102 ${error.name}`);
    if (error.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, updateProduct. ${error.message}`);
      res.status(400).json({ message: error.message });
    } else {
      // Other types of errors
      console.log(`product.controller, updateProduct. ${error.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}
module.exports = {
  getUserById,
  getUserProducts,
  deleteProduct,
  createProduct,
  editProduct,
};
