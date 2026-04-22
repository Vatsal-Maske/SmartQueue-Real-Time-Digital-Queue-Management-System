// API Response helper
export const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Error", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const paginatedResponse = (res, data, page, limit, total) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
};