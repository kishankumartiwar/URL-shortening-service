const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserlogin } = require("../controllers/user");

// Signup route
router.post("/signup", handleUserSignup);

// Login route
router.post("/login", handleUserlogin);

module.exports = router;
