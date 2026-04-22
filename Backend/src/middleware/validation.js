import Joi from "joi";

// Validate request body
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
};

// Common validation schemas
export const schemas = {
  queue: {
    create: Joi.object({
      name: Joi.string().required().min(1),
      avgServiceTime: Joi.number().optional().min(1).default(5),
    }),
  },
  token: {
    join: Joi.object({
      queueId: Joi.string().required(),
    }),
  },
};