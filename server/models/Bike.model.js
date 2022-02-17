const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bikeSchema = new Schema({
    make: { type: String },
    model: { type: String },
    engine: { type: Number }
});

module.exports = mongoose.model('Bike', bikeSchema);