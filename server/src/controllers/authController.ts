import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body, req.file);
    res.status(201).json({ message: 'משתמש נוצר בהצלחה', userId: user._id });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};



export const updateMe = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; 
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updatedUser = await authService.updateUserService(userId, updateData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: any, res: Response) => {
  try {
    const adminId = req.user.id; 
    const users = await authService.getAllUsersService(adminId);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'שגיאה בשליפת משתמשים', error: error.message });
  }
};

export const adminUpdateUser = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { permissions, role } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'מזהה משתמש חסר בבקשה' });
    }

    const updatedUser = await authService.adminUpdateUserService(userId, { permissions, role });

    if (!updatedUser) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Admin Update Error:", error);
    res.status(500).json({ 
      message: 'שגיאה בעדכון המשתמש והרשאותיו', 
      error: error.message 
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await authService.getUserByIdService(id);
    
    if (!user) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }
    
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'שגיאה בשליפת משתמש', error: error.message });
  }
};

export const adminUpdateFull = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updatedUser = await authService.adminUpdateFullService(id, updateData);

    if (!updatedUser) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: 'שגיאה בעדכון משתמש', error: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'נא להזין כתובת אימייל' });
    }

    await authService.forgotPasswordService(email);

    res.status(200).json({ 
      success: true, 
      message: 'מייל לשחזור סיסמה נשלח לכתובת שהזנת' 
    });
  } catch (error: any) {
    console.log("SERVER ERROR:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getUserEmailByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: 'נא להזין שם משתמש' });
    }
    const email = await authService.getEmailByUsernameService(username);
    return res.status(200).json({ email });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'לא נמצא משתמש עם שם משתמש זה' });
    }
    console.error("GET EMAIL ERROR:", error);
    return res.status(500).json({ message: 'שגיאה פנימית בשרת' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    await authService.resetPasswordService(token, password);

    res.status(200).json({ success: true, message: 'הסיסמה שונתה בהצלחה' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};