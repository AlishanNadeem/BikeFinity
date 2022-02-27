const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    title: { type: String },
    venue: { type: String },
    date: { type: Date },
    time: { type: String },
    hostedBy: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('Event', eventSchema);