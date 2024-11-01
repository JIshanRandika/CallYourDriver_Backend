import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js"; // Use import for authRoutes
import driverRoutes from "./routes/drivers.js"; // Use import for driverRoutes

config();
const app = express();
app.use(cors());
app.use(json());

connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
