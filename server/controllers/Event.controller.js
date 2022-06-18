const Event = require('../models/Event.model');

exports.getEvents = (async (req, res, next) => {

    const { status } = req.query;

    Event.find({ status: status }, (err, events) => {
        if (err) return next(err)

        res.send(events)
    });
})

exports.postEvent = (async (req, res, next) => {

    let event = new Event({
        title: req.body.title,
        venue: req.body.venue,
        date: req.body.date,
        description: req.body.description,
        hostedBy: req.decoded.id
    })

    event.save((err) => {
        if (err) return next(err);

        res.send("Event posted successfully")
    })

});