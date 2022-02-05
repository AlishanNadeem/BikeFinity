const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String },
    email: { type: String, trim: true, lowercase: true },
    contactNumber: { type: Number },
    location: { type: String },
    password: { type: String },
    likedAds: [{ type: Schema.Types.ObjectId }],
    joinedDate: { type: Date, default: Date.now },
    status: { type: String, default: "Active" }
});

module.exports = mongoose.model('User', userSchema);