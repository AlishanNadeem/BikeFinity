const Bike = require('../models/Bike.model');

exports.getAllBikes = ((req, res, next) => {
    Bike.find({}, (err, bikes) => {
        if(err) return next(err);

        res.send(bikes);
    });
});