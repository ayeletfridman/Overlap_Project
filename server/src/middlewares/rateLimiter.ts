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


export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: {
    message: 'זוהתה פעילות חריגה. אנא נסה שוב מאוחר יותר.'
  }
});