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
      console.log(encryptPassword);

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
          pass: newUser.rows[0],
          existuser: userExists.rows[0],
          token: jwtToken,
        });
      }
    } else {
      throw new Error("user Exists");
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
          expiresIn: 7200,
        });
        res.status(200).json({
          token: jwtToken,
        });
      } else {
        throw new Error("Password did not matched");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(500).json({
      message: "Wrong user credentials",
    });
  }
};

module.exports = { userRegister, userLogin };
