// Error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};

// Not found handler
export const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};