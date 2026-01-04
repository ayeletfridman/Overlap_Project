import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      profileImage: user.profileImage,
      role: user.role
    } 
  };
};