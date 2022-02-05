const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adSchema = new Schema({
    title: { type: String },
    price: { type: Number },
    year: { type: Number },
    make: { type: String },
    model: { type: String },
    engine: { type: Number },
    kilometers: { type: Number },
    condition: { type: String },
    description: { type: String },
    location: { type: String, default: 'Karachi' },
    postDate: { type: Date, default: Date.now },
    postedBy: { type: Schema.Types.ObjectId }, //user_id from req.decoded
    status: { type: String, default: "Active" },
    // photos: {type: File}
});

module.exports = mongoose.model('Ad', adSchema);