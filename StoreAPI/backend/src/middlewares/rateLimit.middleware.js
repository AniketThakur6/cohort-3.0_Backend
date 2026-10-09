import { rateLimit } from "express-rate-limit";

export const loginIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 50000, // 5 req
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const registerIpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 8999990, // 8 req
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const logoutIpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 800, // 8 req
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const productCreationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: true,
  ipv6Subnet: 56,
});

export const productUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: true,
  ipv6Subnet: 56,
});

export const productDeleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: true,
  ipv6Subnet: 56,
});

export const standardIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1500000000, // 150
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});
