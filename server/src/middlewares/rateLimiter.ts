import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    message: 'יותר מדי ניסיונות התחברות נכשלו. אנא נסה שוב בעוד 15 דקות.'
  },
  standardHeaders: true, 
  legacyHeaders: false,
});
