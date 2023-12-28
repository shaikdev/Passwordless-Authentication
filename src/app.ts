import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import Logger from "./helpers/logger.helper";
import userRoute from "./routes/v1/user.route";

const app = express();

const server = http.createServer(app);

//Init logger
Logger(app);

// config dotenv
dotenv.config();

// passport
app.use(passport.initialize());
require("./helpers/passport.helper")(passport);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//To enable Cross-Origin Resource Sharing
let domain = "*";
if (process.env.NODE_ENV === "dev") {
  domain = "*";
}

app.use(
  cors({
    origin: domain,
  })
);

app.use("/api/v1/auth", userRoute);

//Error Handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === "production") {
    if (err.error) {
      res
        .status(400)
        .send({ desc: "Validation Error", message: err.error?.message });
    } else {
      res.status(500).send({
        desc: err.desc || err.description || "Something Went Wrong",
        message: err.message,
      });
    }
    console.error(err);
  } else {
    if (err.error) {
      res
        .status(400)
        .send({ desc: "Validation Error", message: err.error?.message });
    } else {
      res.status(500).send({
        desc: err.desc || err.description || "Something Went Wrong",
        stack: err.stack,
        message: err.error?.message || err.message,
      });
    }
    console.error(err);
  }
});

export default server;
