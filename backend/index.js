const express = require('express');
const  bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

router.post('/api/login', (req, res) => {
    res.send('Login API call is working.');
});
app.listen(4000, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Server is running on port: 4000');
    }
});