const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Registration and Login.
router.post("/register", authController.register);
router.post("/login", authController.login);

// Routes protected with `verifyToken`.
router.get("/profile", verifyToken, authController.getProfile);
router.put("/users/:id", verifyToken, authController.updateUser);
router.delete("/users/:id", verifyToken, authController.deleteUser);

module.exports = router;
