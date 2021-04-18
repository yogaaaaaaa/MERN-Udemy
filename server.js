const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// define routes
app.use("/api/users", require("./api/users.js"));
app.use("/api/auth", require("./api/auth.js"));
app.use("/api/profile", require("./api/profile.js"));
app.use("/api/posts", require("./api/posts.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running ${PORT}`));
