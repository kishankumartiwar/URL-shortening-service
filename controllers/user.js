const {v4 : uuidv4} = require('uuid');
const User = require("../models/user"); // Use uppercase for Mongoose model
const {setUser} = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    });
    return res.redirect("/"); // Redirect to the home page after signup
  } catch (error) {
    console.error("Error during user signup:", error.message);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleUserlogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }); // Use correct query syntax
    if (!user) {
      return res.render("login", {
        error: "Invalid username or password", // Pass error message to the login page
      });
    }
    const token = setUser(user);
    res.cookie('uid',token)
    return res.redirect("/"); // Redirect to home on successful login
  } catch (error) {
    console.error("Error during user login:", error.message);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleUserSignup,
  handleUserlogin,
};
