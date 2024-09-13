import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../helpers/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../types/ApiError.js";
import { ApiResponse } from "../types/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(404, "All credentials are required");
  }
  const emailExists = await User.findOne({
    email,
  });

  if (emailExists) {
    throw new ApiError("404", "User with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!createdUser) {
    throw new ApiError(500, "Try again later");
  }

  const user = await User.find({
    email,
  }).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User Registered successfully"));
});

const checkUsername = asyncHandler(async (req, res) => {
  const username = req.body;
  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) {
    throw new ApiError("404", "Username already exists");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, username, "Username Available"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError("404", "User doesnt exists");
  }
  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) {
    throw new ApiError("404", "Invalid credentials");
  }
  const payload = { id: user._id, username: user.username, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, payload, "User logged in"));
});

export { registerUser, checkUsername };
