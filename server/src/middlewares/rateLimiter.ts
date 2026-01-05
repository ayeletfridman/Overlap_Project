// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

// הגבלה ספציפית לניסיונות התחברות (Login)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // חלון זמן של 15 דקות
  max: 5, // מקסימום 5 ניסיונות התחברות מכתובת IP אחת
  message: {
    message: 'יותר מדי ניסיונות התחברות נכשלו. אנא נסה שוב בעוד 15 דקות.'
  },
  standardHeaders: true, // מחזיר מידע על המגבלה ב-headers (RateLimit-Limit)
  legacyHeaders: false,
});

// הגבלה כללית לכל שאר הבקשות באתר (למנוע עומס)
export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // שעה אחת
  max: 100, // 100 בקשות בשעה ל-IP
  message: {
    message: 'זוהתה פעילות חריגה. אנא נסה שוב מאוחר יותר.'
  }
});