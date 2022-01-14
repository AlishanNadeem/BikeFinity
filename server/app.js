const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./routes/User.route');
const Auth = require('./routes/Auth.route');

const app = express();

mongoose.connect('mongodb+srv://bikefinity:bikefinity@cluster0.8ic8r.mongodb.net/BikeFinity', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to Database"))
    .catch(err => {
        console.error("Couldnot connect to Database", err);
        process.exit();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/bikefinity/auth', Auth);
app.use('/bikefinity/user', User);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running on ${port} ...`);
});