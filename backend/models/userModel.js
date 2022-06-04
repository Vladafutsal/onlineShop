const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: Boolean},
    password: {type: String, required: Boolean}
});

const UserModel = mongoose.model(name:'users', userSchema);

module.exports = UserModel;