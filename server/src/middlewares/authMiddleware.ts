import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const protect = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'אין הרשאה, חסר טוקן' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'טוקן לא תקין' });
  }
};

export const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    res.status(403).json({ message: 'גישה נדחתה: אינך מנהל מערכת' });
  }
};