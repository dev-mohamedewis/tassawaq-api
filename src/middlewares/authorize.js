const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }

    next();
  };
};

export default authorize;