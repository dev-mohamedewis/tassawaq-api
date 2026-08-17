import Brand from "./brand.model.js";


// Create a new brand
const createBrand = async (brandData) => {
  const existingBrand = await Brand.findOne({
    $or: [
      { name: brandData.name },
      { slug: brandData.slug },
    ],
    isDeleted: false,
  });

  if (existingBrand) {
    const error = new Error(
      "Brand with this name or slug already exists"
    );
    error.statusCode = 409;
    throw error;
  }

  const brand = await Brand.create(brandData);

  return brand;
};


// Get all active brands
const getBrands = async () => {
  const brands = await Brand.find({
    isDeleted: false,
    isActive: true,
  }).sort({ createdAt: -1 });

  return brands;
};


// Get one brand by ID
const getBrandById = async (brandId) => {
  const brand = await Brand.findOne({
    _id: brandId,
    isDeleted: false,
  });

  if (!brand) {
    const error = new Error("Brand not found");
    error.statusCode = 404;
    throw error;
  }

  return brand;
};


// Update a brand
const updateBrand = async (brandId, brandData) => {
  const brand = await Brand.findOne({
    _id: brandId,
    isDeleted: false,
  });

  if (!brand) {
    const error = new Error("Brand not found");
    error.statusCode = 404;
    throw error;
  }


  if (brandData.slug && brandData.slug !== brand.slug) {
    const existingBrand = await Brand.findOne({
      slug: brandData.slug,
      _id: { $ne: brandId },
      isDeleted: false,
    });

    if (existingBrand) {
      const error = new Error("Slug is already in use");
      error.statusCode = 409;
      throw error;
    }
  }


  if (brandData.name && brandData.name !== brand.name) {
    const existingBrand = await Brand.findOne({
      name: brandData.name,
      _id: { $ne: brandId },
      isDeleted: false,
    });

    if (existingBrand) {
      const error = new Error("Brand name is already in use");
      error.statusCode = 409;
      throw error;
    }
  }


  Object.assign(brand, brandData);

  await brand.save();

  return brand;
};


// Soft delete a brand
const deleteBrand = async (brandId) => {
  const brand = await Brand.findOne({
    _id: brandId,
    isDeleted: false,
  });

  if (!brand) {
    const error = new Error("Brand not found");
    error.statusCode = 404;
    throw error;
  }


  brand.isDeleted = true;
  brand.deletedAt = new Date();

  await brand.save();

  return brand;
};


export {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};