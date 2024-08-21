const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");

const session = require("express-session");
const passport = require("passport");
const passportlocalmongoose = require("passport-local-mongoose");

const mongoose = require("mongoose");

const PORT = 5000;
const URL = `http://localhost:${PORT}/`;

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    "mongodb+srv://ayush2022ca016:jhaaayus@cluster0.v4icccp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

const userschema = new mongoose.Schema({
  username: String,
  password: String,
  Speed: {
    type: [
      {
        type: Number,
        validate: {
          validator: function (v) {
            return Array.isArray(v) && v.length <= 10;
          },
          message: "Speed array can only store up to 10 records",
        },
      },
    ],
  },
  Accuracy: {
    type: [
      {
        type: Number,
        validate: {
          validator: function (v) {
            return Array.isArray(v) && v.length <= 10;
          },
          message: "Accuracy array can only store up to 10 records",
        },
      },
    ],
  },
  maxs: {
    type: Number,
    default: 0,
  },
  maxa: {
    type: Number,
    default: 0,
  },
});

userschema.plugin(passportlocalmongoose);

const usermodel = mongoose.model("GoType", userschema);

passport.use(usermodel.createStrategy());

passport.serializeUser(usermodel.serializeUser());
passport.deserializeUser(usermodel.deserializeUser());