import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "./brand.service.js";


// Create brand
const createBrandController = async (req, res, next) => {
  try {
    const brand = await createBrand(req.body);

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};


// Get all brands
const getBrandsController = async (req, res, next) => {
  try {
    const brands = await getBrands();

    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};


// Get brand by ID
const getBrandByIdController = async (req, res, next) => {
  try {
    const brand = await getBrandById(req.params.brandId);

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};


// Update brand
const updateBrandController = async (req, res, next) => {
  try {
    const brand = await updateBrand(
      req.params.brandId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};


// Delete brand
const deleteBrandController = async (req, res, next) => {
  try {
    const brand = await deleteBrand(req.params.brandId);

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};


export {
  createBrandController,
  getBrandsController,
  getBrandByIdController,
  updateBrandController,
  deleteBrandController,
};