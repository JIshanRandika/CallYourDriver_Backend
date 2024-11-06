import compare from "bcryptjs"; // Import the entire bcryptjs module
import User from "../models/User.js"; // Import User model
import sign from "jsonwebtoken"; // Import the entire jsonwebtoken module


const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
  console.log (req.body)
  
  const { name, contactNumber, username, password } = req.body;
  // Validate input fields
  if (!name || !contactNumber || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const User = new User( name, contactNumber, username, password );
    await User.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await findOne({ username });
    if (user && (await compare(password, user.password))) {
      const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
      res.json({ token });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}
