const express = require("express");

// Express app
const app = express();

// Listen for request
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  //   res.send("<h2>Hello World!</h2>");
  res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  //   res.send("<h2>About Page</h2>");
  res.sendFile("./views/about.html", { root: __dirname });
});

// Redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", { root: __dirname })
})