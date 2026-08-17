import Category from "./category.model.js";

// Create category
const createCategory = async (categoryData) => {
  const existingCategory = await Category.findOne({
    $or: [
      { name: categoryData.name, isDeleted: false },
      { slug: categoryData.slug, isDeleted: false },
    ],
  });

  if (existingCategory) {
    const error = new Error(
      existingCategory.name === categoryData.name
        ? "Category name already exists"
        : "Category slug already exists"
    );

    error.statusCode = 409;
    throw error;
  }

  const category = await Category.create(categoryData);

  return category;
};

// Get all active categories
const getCategories = async () => {
  const categories = await Category.find({
    isDeleted: false,
    isActive: true,
  }).sort({ createdAt: -1 });

  return categories;
};

// Get category by ID
const getCategoryById = async (categoryId) => {
  const category = await Category.findOne({
    _id: categoryId,
    isDeleted: false,
  });

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  return category;
};

// Update category
const updateCategory = async (categoryId, categoryData) => {
  const category = await Category.findOne({
    _id: categoryId,
    isDeleted: false,
  });

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  if (categoryData.name && categoryData.name !== category.name) {
    const existingCategory = await Category.findOne({
      name: categoryData.name,
      isDeleted: false,
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      const error = new Error("Category name already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  if (categoryData.slug && categoryData.slug !== category.slug) {
    const existingCategory = await Category.findOne({
      slug: categoryData.slug,
      isDeleted: false,
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      const error = new Error("Category slug already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  Object.assign(category, categoryData);

  await category.save();

  return category;
};

// Soft delete category
const deleteCategory = async (categoryId) => {
  const category = await Category.findOne({
    _id: categoryId,
    isDeleted: false,
  });

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  category.isDeleted = true;
  category.isActive = false;
  category.deletedAt = new Date();

  await category.save();

  return true;
};

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};