const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const pool = require("./model/dbcon");
const taskRouter = require("./routes/taskRouter");

dotenv.config();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const { ErrorHandler, NotFound } = require("./middlewares/error/ErrorHandler");
app.use("/task", taskRouter);
// app.use(NotFound);
// app.use(ErrorHandler);
app.listen(5000, () => {
  console.log(`Server has started on http://localhost:${process.env.PORT}`);
});
