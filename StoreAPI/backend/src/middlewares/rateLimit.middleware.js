import { rateLimit } from "express-rate-limit";

export const loginIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 5, // 5 req
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const registerIpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 8, // 8 req
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const productCreationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: true,
  ipv6Subnet: 56,
});

export const standardIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});
