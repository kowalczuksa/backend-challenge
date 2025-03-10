const jwt = require("jsonwebtoken");

// Middleware to verify if the user is authenticated.
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization"); // Obtaining the token from the header

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY); // Verifying the token
    req.user = verified; // Save the user data in the request object
    next(); // We continue with the execution of the route.
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
