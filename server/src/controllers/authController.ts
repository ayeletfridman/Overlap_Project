import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { catchAsync } from '../utils/catchAsync';

export const register = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.registerUser(req.body, req.file);
    res.status(201).json({ message: 'משתמש נוצר בהצלחה', userId: user._id });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
});

export const updateMe = catchAsync(async (req: any, res: Response) => {
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
});

export const getAllUsers = catchAsync(async (req: any, res: Response) => {
    const adminId = req.user.id;
    const users = await authService.getAllUsersService(adminId);
    res.status(200).json(users);
});

export const adminUpdateUser = catchAsync(async (req: any, res: any) => {
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
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await authService.getUserByIdService(id);

    if (!user) {
        return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    res.status(200).json(user);
});

export const adminUpdateFull = catchAsync(async (req: any, res: Response) => {
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
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'נא להזין כתובת אימייל' });
    }

    await authService.forgotPasswordService(email);

    res.status(200).json({
        success: true,
        message: 'מייל לשחזור סיסמה נשלח לכתובת שהזנת'
    });
});

export const getUserEmailByUsername = catchAsync(async (req: Request, res: Response) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ message: 'נא להזין שם משתמש' });
    }
    const email = await authService.getEmailByUsernameService(username);
    res.status(200).json({ email });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    await authService.resetPasswordService(token, password);

    res.status(200).json({ success: true, message: 'הסיסמה שונתה בהצלחה' });
});