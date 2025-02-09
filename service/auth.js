const jwt = require("jsonwebtoken");
const secret = "kishan";

// Function to generate a JWT for the user
function setUser(user) {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      secret,
      { expiresIn: "1h" } // Optional: Set token expiration
    );
  } catch (err) {
    console.error("Error generating JWT:", err.message);
    return null;
  }
}

// Function to decode and verify a JWT
function getUser(token) {
  if (!token) {
    console.warn("Token not provided");
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("Error verifying JWT:", err.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
