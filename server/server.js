require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OktaJwtVerifier = require("@okta/jwt-verifier");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const invTemplRouter = require("./routes/inviteTemplate");
const invRouter = require("./routes/invitation");

app.use(cors());
app.use(express.json());
app.use("/inviteTemplate", invTemplRouter);
app.use("/sendInvite", invRouter);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "/../client")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/index.html"));
});

// DATABASE
const uri = process.env.PROD_MONGODB;
mongoose.set("useCreateIndex", true);

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log("DB Connection Error: " + err);
  });
