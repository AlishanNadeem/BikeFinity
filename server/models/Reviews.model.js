const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reviewSchema = new Schema({
    review: { type: String },
    bike: { type: Schema.Types.ObjectId },
    postedBy: { type: String }
});

module.exports = mongoose.model('Review', reviewSchema);