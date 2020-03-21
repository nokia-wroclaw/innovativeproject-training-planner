const express = require('express');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.PROD_MONGODB || 'mongodb+srv://MiJam:TraficJam@cluster0-kwmon.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.set('useCreateIndex', true)

mongoose
.connect(uri, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log('DB Connection Error: ' + err);
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/index.html'))
})
