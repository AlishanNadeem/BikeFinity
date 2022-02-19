const Bike = require('../models/Bike.model');

exports.getAllBikes = ((req, res, next) => {
    Bike.find({}, (err, bikes) => {
        if(err) return next(err);

        res.send(bikes);
    });
});

exports.getBikeMake = ((req, res, next) => {
    Bike.distinct("make", (err, make) => {
        if(err) return next(err);

        res.send(make);
    })
});

exports.getBikeModel = ((req, res, next) => {
    Bike.aggregate([
        {
            $match : {
                make: req.params.make
            }
        }
    ], (err, models) => {
        if(err) return next(err);

        res.send(models);
    })
});