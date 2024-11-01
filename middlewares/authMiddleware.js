import jwt from "jsonwebtoken"; // Import the entire jsonwebtoken module
const { verify } = jwt; // Destructure the verify method from the jwt object
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info (like ID) to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
