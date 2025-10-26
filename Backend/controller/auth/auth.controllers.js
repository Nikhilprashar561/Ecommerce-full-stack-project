import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModels } from "../../models/User.js";

const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const checkUser = await UserModels.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    const hashPassword = await bcryptjs.hash(password, 12);
    const newUser = await UserModels({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Register User SuccessFully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error While Registering",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await UserModels.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcryptjs.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export { register, login };
