const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    location: { type: String },
    password: { type: String },
    joinedDate: { type: Date, default: Date.now },
    status: { type: String, default: "Active" }
});

module.exports = mongoose.model('User', userSchema);