const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose").set("strictQuery", false);
const app = express();

//routes
const authRoute = require("./routes/auth.route");
const adminRoute = require("./routes/admin/auth.route");

// environment varriable
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", authRoute);
app.use("/api", adminRoute);

// mongodb connection
//mongodb+srv://flipCart:<password>@cluster0.nrlso9h.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrlso9h.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Conected");
  });

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hellow from server",
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + `${process.env.PORT}`);
});
