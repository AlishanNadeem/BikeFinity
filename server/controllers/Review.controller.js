const Review = require('../models/Review.model');

exports.postReview = ((req, res, next) => {
    let review = new Review({
        review: req.body.review,
        rating: req.body.rating,
        bikeId: req.body.bikeId,
        userId: req.decoded.id,
    });

    review.save((err) => {
        if (err) return next(err);

        res.send("Review posted successfully");
    })
});

exports.getReviews = ((req, res, next) => {
    Review.findById({ _id: req.params.id }, (err, reviews) => {
        if (err) return next(err);

        res.send(reviews);
    })
});

exports.getTopRatedReviews = ((req, res, next) => {
    Review.find({}, (err, reviews) => {
        if (err) return next(err);

        res.send(reviews);
    })
});