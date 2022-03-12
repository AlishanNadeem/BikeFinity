const Review = require('../models/Review.model');
const Bike = require('../models/Bike.model');
const mongoose = require('mongoose');

exports.postReview = (async (req, res, next) => {

    let review = new Review({
        review: req.body.review,
        rating: req.body.rating,
        bikeId: req.body.bikeId,
        userId: req.decoded.id,
    });

    let bike = await Bike.findById(review.bikeId);

    console.log("Bike", bike);

    let counterReviews = bike.counterReviews + 1;

    console.log("Reviews #", counterReviews)

    let averageRating = (bike.averageRating + review.rating) / counterReviews;

    console.log("Avg Rat ", averageRating)

    Bike.findByIdAndUpdate(review.bikeId,
        {
            $set: {
                averageRating: averageRating,
                counterReviews: counterReviews
            }
        }, (err) => {
            if (err) return next(err);
        });

    review.save((err) => {
        if (err) return next(err);

        res.send("Review posted successfully");
    });
});

exports.getReviews = ((req, res, next) => {

    // Review.findOne({bikeId: req.params.id}, (err, review) => {
    //     if(err) return next(err);

    //     res.send(review);
    // })

    Review.aggregate([
        {
            $match: {
                bikeId: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
    ], (err, review) => {
        if (err) return next(err);

        res.send(review);
    })
});

exports.getTopRatedReviews = ((req, res, next) => {
    Review.find({}, (err, reviews) => {
        if (err) return next(err);

        res.send(reviews);
    })
});

//getting user review with respect to one specific bike.
exports.getUserReview = ((req, res, next) => {
    Review.find({ bikeId: req.params.id, userId: req.decoded.id }, (err, review) => {
        if (err) return next(err);

        if (review.length === 0) {
            res.send({
                status: 404,
                msg: "No Review Found"
            })
        }
        else {
            res.send(review[0])
        }
    })
});