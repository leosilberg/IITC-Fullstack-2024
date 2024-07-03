const Product = require("../models/product.model.js");

async function getProducts(req, res) {
  const { name, priceMin, priceMax, quantity, category, pageNum, pageCount } =
    req.query;

  try {
    const query = Product.find({
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...((parseInt(priceMin) || parseInt(priceMax)) && {
        price: {
          ...(parseInt(priceMin) && { $gte: parseInt(priceMin) }),
          ...(parseInt(priceMax) && { $lte: parseInt(priceMax) }),
        },
      }),
      ...(parseInt(quantity) && { quantity: { $gte: parseInt(quantity) } }),
      ...(category && {
        category: { $in: new RegExp(category, "i") },
      }),
    }).toConstructor();

    const count = await query().countDocuments();
    const totalPages = pageCount ? Math.ceil(count / pageCount) : 1;

    const currentPage = pageNum
      ? pageNum > totalPages
        ? totalPages
        : parseInt(pageNum)
      : 1;
    const products = await query()
      .skip((currentPage - 1) * pageCount)
      .limit(pageCount);

    res.status(200).json({ products, totalPages, currentPage });
  } catch (error) {
    console.log(
      "products.controller, getProducts. Error while getting products",
      error
    );
    res.status(500).json({ message: error.message });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(
      `products.controller, getProductById. Error while getting products with id: ${id}`,
      error.name
    );
    res.status(500).json({ message: error.message });
  }
}



module.exports = {
  getProducts,
  getProductById,
};
