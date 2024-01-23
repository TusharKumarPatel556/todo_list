const jwt = require("jsonwebtoken");
const IsUserLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = user;
  } catch (err) {
    res.status(500).json({
      message: "Please LogIn First",
    });
  }

  next();
};

module.exports = IsUserLoggedIn;
