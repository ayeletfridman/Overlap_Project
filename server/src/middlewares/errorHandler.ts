import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('--- ERROR LOG ---');
  console.error(err.stack); 

  if (err.name === 'ValidationError') {
     return res.status(400).json({
       message: 'נתונים חסרים או לא תקינים',
       details: err.message
     });
   }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};