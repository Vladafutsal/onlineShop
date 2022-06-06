const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');
const serverConfig = require('./config/serverConfig');

const app = express();
mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log('MONGO DB is connected.'))
    .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const reqBody = req.body;

    const foundUser = Users.findOne(reqBody, (err, data) => {
        console.log(data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }

        // First way
        // if (data)
        //     res.send(data);
        // else {
        //     res.send('User not found.');
        // }

        // Second way
        // res.send(data ? data : 'User not found.');

        // Third way
        res.send(data || 'User not found.');
    });
});

app.post('/api/register', async (req,res) => {
    const reqBody = req.body;
    // console.log(reqBody);

    Users.findOne(reqBody, async (err, data) => {
        console.log(data);
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
            return;
        }

        if (data)
            res.send(`User already exist: ${data.username}`);
        else {
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();
            console.log(saveNewUser);

            res.send(saveNewUser || 'User not registered.');
        }
    });
});

app.listen(serverConfig.port, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(serverConfig.serverMsg);
    }
});