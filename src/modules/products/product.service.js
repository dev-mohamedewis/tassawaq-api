import Product from "./product.model.js";
import Category from "../categories/category.model.js";
import Brand from "../brands/brand.model.js";


// Create product
const createProduct = async (productData) => {
  const {
    name,
    slug,
    description,
    price,
    discountPrice,
    stock,
    category,
    brand,
    images,
    isActive,
  } = productData;


  // Check if category exists
  const categoryExists = await Category.findOne({
    _id: category,
    isDeleted: false,
  });

  if (!categoryExists) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }


  // Check if brand exists
  if (brand) {
    const brandExists = await Brand.findOne({
      _id: brand,
      isDeleted: false,
    });

    if (!brandExists) {
      const error = new Error("Brand not found");
      error.statusCode = 404;
      throw error;
    }
  }


  // Check duplicate slug
  const existingProduct = await Product.findOne({
    slug,
    isDeleted: false,
  });

  if (existingProduct) {
    const error = new Error("Product with this slug already exists");
    error.statusCode = 409;
    throw error;
  }


  // Create product
  const product = await Product.create({
    name,
    slug,
    description,
    price,
    discountPrice,
    stock,
    category,
    brand: brand || null,
    images: images || [],
    isActive: isActive ?? true,
  });


  return product;
};

// Get all products
const getProducts = async () => {
  const products = await Product.find({
    isDeleted: false,
  })
    .populate("category", "name slug")
    .populate("brand", "name slug")
    .sort({ createdAt: -1 });

  return products;
};

// Get product by ID
const getProductById = async (productId) => {
  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
  })
    .populate("category", "name slug")
    .populate("brand", "name slug");

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

// Update product
const updateProduct = async (productId, productData) => {
  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }


  // Check category if it is being updated
  if (productData.category) {
    const categoryExists = await Category.findOne({
      _id: productData.category,
      isDeleted: false,
    });

    if (!categoryExists) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
  }


  // Check brand if it is being updated
  if (productData.brand) {
    const brandExists = await Brand.findOne({
      _id: productData.brand,
      isDeleted: false,
    });

    if (!brandExists) {
      const error = new Error("Brand not found");
      error.statusCode = 404;
      throw error;
    }
  }


  // Check duplicate slug
  if (productData.slug && productData.slug !== product.slug) {
    const existingProduct = await Product.findOne({
      slug: productData.slug,
      isDeleted: false,
      _id: { $ne: productId },
    });

    if (existingProduct) {
      const error = new Error("Product with this slug already exists");
      error.statusCode = 409;
      throw error;
    }
  }


  Object.assign(product, productData);

  await product.save();

  return product;
};

// Delete product
const deleteProduct = async (productId) => {
  const product = await Product.findOne({
    _id: productId,
    isDeleted: false,
  });

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }


  product.isDeleted = true;
  product.deletedAt = new Date();

  await product.save();

  return product;
};
export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};