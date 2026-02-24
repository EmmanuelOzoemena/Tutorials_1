dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/model");

// Express app
const app = express();

// Register view engine

// Mongoose & connect to MongoDB
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });

// View engine setup
app.set("view engine", "ejs");

// Middleware & static file (eg. CSS, images that'll be made public)
app.use(express.static("public"));
app.use(morgan("dev"));

// Routes

app.get("/", (req, res) => {
  //   res.send("<h2>Hello World!</h2>");
  // res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeats browser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  //   res.send("<h2>About Page</h2>");
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
