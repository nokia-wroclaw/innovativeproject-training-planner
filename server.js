const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.PROD_MONGODB || "mongodb://localhost/test";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users");
const invTemplRouter = require("./routes/inviteTemplate");
const invRouter = require("./routes/invitation");

app.use("/users", usersRouter);
app.use("/inviteTemplate", invTemplRouter);
app.use("/sendInvite", invRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
