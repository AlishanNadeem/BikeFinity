const Bike = require('../models/Bike.model');

exports.getAllBikes = ((req, res, next) => {
    Bike.find({}, (err, bikes) => {
        if (err) return next(err);

        res.send(bikes);
    });
});

exports.getBike = ((req, res, next) => {
    Bike.findById({ _id: req.params.id }, (err, bikes) => {
        if (err) return next(err);

        res.send(bikes);
    });
});

exports.getBikeMake = ((req, res, next) => {
    Bike.distinct("make", (err, make) => {
        if (err) return next(err);

        res.send(make);
    })
});

exports.getBikeModel = ((req, res, next) => {
    Bike.aggregate([
        {
            $match: {
                make: req.params.make
            }
        }
    ], (err, models) => {
        if (err) return next(err);

        res.send(models);
    })
});

exports.getTopRatedBikes = ((req, res, next) => {
    Bike.aggregate([
        {
            $sort: {
                "averageRating": -1
            }
        },
        {
            $limit: 5
        }
    ], (err, models) => {
        if(err) return next(err);

        res.send(models);
    })
});