"use strict";

let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express();

//STATIC FILES
app.use(express.static(__dirname + "/public/"));

//VIEWS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

//BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//.ENV
require("dotenv").config();

//ROUTES
app.use("/", require("./Router/routes"));

//MONGODB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.exjgsa7.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

//PORT
let port = process.env.PORT || 3000;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(e));

app.listen(port);
