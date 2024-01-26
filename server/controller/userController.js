const pool = require("../model/dbcon");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User register Logic
const userRegister = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!userExists.rows.length) {
      const encryptPassword = await bcrypt.hash(password, 10);

      const newUser = await pool.query(
        "INSERT INTO users (name, email, mobile,password) VALUES($1, $2, $3,$4) RETURNING *",
        [name, email, mobile, encryptPassword]
      );

      if (newUser.rows[0]) {
        const jwtToken = await jwt.sign(
          newUser.rows[0],
          process.env.JWT_SECRET,
          { expiresIn: 7200 }
        );

        res.json({
          token: jwtToken,
          message: "success",
        });
      }
    } else {
      res.json({
        message: "user exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//User Login Logic
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.query;
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (user.rows.length) {
      const passwordMatched = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (passwordMatched) {
        const jwtToken = await jwt.sign(user.rows[0], process.env.JWT_SECRET, {
          expiresIn: 72000,
        });
        res.status(200).json({
          token: jwtToken,
          message: "success",
        });
      } else {
        res.status(500).json({
          message: "Wrong user Credentials",
        });
      }
    } else {
      res.status(500).json({
        message: "Wrong user Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Wrong user Credentials",
    });
  }
};

module.exports = { userRegister, userLogin };
