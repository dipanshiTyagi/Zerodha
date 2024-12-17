const User = require("../model/UserModel");
const {createSecretToken} = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// Validation Schema
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(3).required(),
});

// Signup Function
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate input
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message, success: false });
    }

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password", hashedPassword);

    // Create the new user
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Create a token
    const token = createSecretToken(user._id);

    // Set the token in cookies
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "strict"
    });

    // Send success response
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Login Function
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Find the user
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const newhashedPassword = await bcrypt.hash(password, 10);
    if (newhashedPassword == user.password){
      return res.status(400).json({
        message: "Correct password",
        success: true,
      });
    }
    // Verify the password
    // const auth = await bcrypt.compare(password, user.password);
    // console.log("Password comparison result:", auth); // Debugging

    // if (!auth) {
    //   return res.status(400).json({
    //     message: "Incorrect password",
    //     success: false,
    //   });
    // }

    // Create a token
    const token = createSecretToken(user._id);

    // Set the token in cookies
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "strict"
    });

    // Send success response
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
