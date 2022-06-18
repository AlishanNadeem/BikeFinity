const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    title: { type: String },
    venue: { type: String },
    date: { type: Date },
    images: { type: String },
    description: { type: String },
    status: { type: String, default: 'Active' },
    hostedBy: { type: Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);