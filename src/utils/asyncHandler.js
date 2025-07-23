const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error("Caught Error:", error);

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        errors: error.errors || [],
      });
    }
  };
};

export { asyncHandler };
