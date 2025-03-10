const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res.status(400).json({ error: "Email is already registered" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    res.json({ message: "User successfully created", user });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login with email:", email);

    // Search for user in the database
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    console.log("User found:", user);

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Incorrect password" });

    console.log("Generating JWT token...");
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("Token successfully generated:", token);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login error:" });
  }
};

// Get User Profile
exports.getProfile = (req, res) => {
  res.json({ message: "You accessed the profile", user: req.user });
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Search user by ID
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update data
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json({ message: "User updated correctly", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Search user by ID
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
