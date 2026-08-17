import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.js";


// Create product
const createProductController = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};


// Get all products
const getProductsController = async (req, res, next) => {
  try {
    const products = await getProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};


// Get product by ID
const getProductByIdController = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};


// Update product
const updateProductController = async (req, res, next) => {
  try {
    const product = await updateProduct(
      req.params.productId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};


// Delete product
const deleteProductController = async (req, res, next) => {
  try {
    await deleteProduct(req.params.productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};