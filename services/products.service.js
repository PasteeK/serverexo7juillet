const Product = require('../schemas/products');

const getAllProducts = async () => {
  return await Product.find();
};

const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const deleteProductById = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProductById,
};
