import { rateLimit } from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-8", // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

// Stricter limiter for sensitive routes like auth
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 10 requests per 15 minutes for auth
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
});

// Guest (unauthenticated) order placement from public landing pages — abuse/spam guard
export const guestOrderRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 20 guest orders per 15 minutes
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many orders placed from this device, please try again later",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});
