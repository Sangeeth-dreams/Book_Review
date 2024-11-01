import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const router = express.Router();

// Registration Route
router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return response.status(400).send({
        message:
          "Please provide all required fields: username, email, password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return response
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: "Error registering user" });
  }
});

// Login Route
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    // Check if all required fields are provided
    if (!email || !password) {
      return response.status(400).send({
        message: "Please provide all required fields: email, password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    // Here you could create and send a JWT
    return response.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: "Error logging in" });
  }
});

export default router;
