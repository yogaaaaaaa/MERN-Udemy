const express = require("express");
const connectDB = require("./config/db");
const path = require('path')
const app = express();

//connect Database
connectDB();

//init middleware
app.use(
  express.json({
    extended: false,
  })
);

// app.get("/", (req, res) => res.send("API Running"));

// define routes
app.use("/api/users", require("./routes/api/users.js"));
app.use("/api/auth", require("./routes/api/auth.js"));
app.use("/api/profile", require("./routes/api/profile.js"));
app.use("/api/posts", require("./routes/api/posts.js"));

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running ${PORT}`));
