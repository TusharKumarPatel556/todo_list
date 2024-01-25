const jwt = require("jsonwebtoken");
const isuserLoggedin = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.body.user = user;
      next();
    } else {
      throw new Error("Please Login First");
    }
  } catch (err) {
    res.status(500).json({
      message: "Please LogIn First",
    });
  }
};

module.exports = isuserLoggedin;
