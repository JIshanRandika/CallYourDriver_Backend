import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';

export async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export function logoutUser(req, res) {
  res.json({ message: 'Logged out successfully' });
}
