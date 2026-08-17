import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.service.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";

const createCategoryController = async (req, res, next) => {
  try {
    const { error, value } = createCategorySchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const category = await createCategory(value);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryByIdController = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.categoryId);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategoryController = async (req, res, next) => {
  try {
    const { error, value } = updateCategorySchema.validate(req.body);

    if (error) {
      const validationError = new Error(error.details[0].message);
      validationError.statusCode = 400;
      throw validationError;
    }

    const category = await updateCategory(
      req.params.categoryId,
      value
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    await deleteCategory(req.params.categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
};