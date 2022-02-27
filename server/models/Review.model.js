const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
    review: { type: String },
    rating: { type: Number},
    bikeId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('Review', reviewSchema);