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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<h2>About Page</h2>");
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// Blog routes

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create a blog
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get a single blog
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delet a blog
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
