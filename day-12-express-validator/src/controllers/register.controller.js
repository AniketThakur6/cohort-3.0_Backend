import userModel from "./../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, phone, password } = req.body;

  const user = await userModel.create({
    email,
    phone,
    passwordHash: await bcrypt.hash(password, 12),
  });

  res.status(201).json({
    message: "user registered successfully",
    data: {
      email: user.email,
      phone: user.phone,
      id: user._id,
    },
  });
};
