import { Schema, model } from "mongoose"; // Use ES module imports
import hash from "bcryptjs"; // Import the entire bcryptjs module

const User = new Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

User.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

export default User; // This is the default export
