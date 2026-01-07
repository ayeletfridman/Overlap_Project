import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';
import PermissionRequest from '../models/PermissionRequest';
export const registerUser = async (userData: any, file?: Express.Multer.File) => {

  const existingUser = await User.findOne({ 
    $or: [{ email: userData.email }, { username: userData.username }] 
  });
  if (existingUser) throw new Error('משתמש עם אימייל או שם משתמש זה כבר קיים');


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);


  const newUser = new User({
    ...userData,
    password: hashedPassword,
    profileImage: file ? file.path : '' 
  });

  return await newUser.save();
};

export const loginUser = async (loginData: any) => {
  const { username, password } = loginData;

  const user = await User.findOne({ username });
  if (!user) throw new Error('שם משתמש או סיסמה שגויים');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('שם משתמש או סיסמה שגויים');

  const token = jwt.sign(
    { id: user._id, role: user.role, permissions: user.permissions },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  return { 
    token, 
    user: { 
      id: user._id, 
      username: user.username, 
      firstName: user.firstName, 
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      permissions: user.permissions,
      createdAt: user.createdAt
    } 
  };
};


export const updateUserService = async (userId: string, updateData: any) => {
  delete updateData.role;
  delete updateData.permissions;

  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  }).select('-password');
};

export const getAllUsersService = async (excludeUserId: string) => {
  return await User.find({ _id: { $ne: excludeUserId } })
    .select('-password')
    .sort({ createdAt: -1 });
};
export const adminUpdateUserService = async (userId: string, updateData: { permissions: any, role: string }) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { 
      permissions: updateData.permissions, 
      role: updateData.role 
    },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) return null;

  if (updateData.permissions) {
    const approvedPermissions = Object.keys(updateData.permissions).filter(
      (key) => updateData.permissions[key] === true
    );
    if (approvedPermissions.length > 0) {
      await PermissionRequest.updateMany(
        {
          userId: userId, 
          requestedPermission: { $in: approvedPermissions }, 
          status: 'pending'
        },
        {
          $set: { 
            status: 'approved',
            adminNotes: 'אושר מעמוד ניהול משתמשים' 
          }
        }
      );
    }
  }

  return updatedUser;
};

export const getUserByIdService = async (userId: string) => {
  return await User.findById(userId).select('-password');
};

export const adminUpdateFullService = async (userId: string, updateData: any) => {
  return await User.findByIdAndUpdate(
    userId,
    { 
      ...updateData, 
    },
    { new: true, runValidators: true }
  ).select('-password');
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('לא נמצא משתמש עם כתובת האימייל הזו');
  }

  const resetToken = (user as any).getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
    שלום ${user.firstName},
    קיבלנו בקשה לאיפוס הסיסמה שלך.
    אנא לחץ על הקישור הבא כדי לאפס את הסיסמה:
    
    ${resetUrl}
    
    הקישור יהיה בתוקף ל-10 דקות בלבד.
    אם לא ביקשת לאפס את הסיסמה, נא התעלם ממייל זה.
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'איפוס סיסמה - Project Manager',
      message: message,
    });
  } catch (error) {
    console.error("NODEMAILER ERROR:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new Error('שגיאה בשליחת המייל, נסה שוב מאוחר יותר');
  }
};

export const resetPasswordService = async (token: string, newPassword: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: new Date() },
  });

  if (!user) {
    throw new Error('הטוקן לא תקף או שפג תוקפו');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  return user;
};

export const getEmailByUsernameService = async (username: string) => {
  const user = await User.findOne({ username }).select('email');
  
  if (!user) {
    throw new Error('User not found');
  }

  return user.email;
};