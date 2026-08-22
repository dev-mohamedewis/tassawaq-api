import {
  getDashboardOverview,
  getSalesOverview,
} from "./admin.service.js";


// Dashboard overview
const getDashboardOverviewController = async (
  req,
  res,
  next
) => {
  try {
    const data = await getDashboardOverview();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// Sales overview
const getSalesOverviewController = async (
  req,
  res,
  next
) => {
  try {
    const data = await getSalesOverview();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};


export {
  getDashboardOverviewController,
  getSalesOverviewController,
};