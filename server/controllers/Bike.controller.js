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
})