const sendMessage = require('../helpers/Twilio');
const Ads = require('../models/Ads.model');

exports.postAd = ((req, res, next) => {
    let ad = new Ads({
        title: req.body.title,
        price: req.body.price,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        engine: req.body.engine,
        kilometers: req.body.kilometers,
        condition: req.body.condition,
        description: req.body.description,
        location: req.body.location,
        // postedBy: req.decoded.id
    });

    ad.save((err) => {
        if (err) return next(err);

        res.send("Ad posted successfully");
    })
});

exports.getAds = ((req, res, next) => {

    const page = req.query.page
    const adsPerPage = 10;

    Ads.aggregate([
        {
            $match: {
                status: "Active"
            }
        },
        {
            $skip: (page - 1) * adsPerPage
        },
        {
            $limit: adsPerPage
        }
    ], (err, ads) => {
        if (err) return next(err);

        res.send(ads);
    });
});

exports.getAd = ((req, res, next) => {
    Ads.findById({ _id: req.params.id }, (err, ad) => {
        if (err) return next(err);

        res.send(ad);
    })
});

//messaging using TWILIO
exports.message = (async (req, res, next) => {
    try {
        let messageId = await sendMessage(req.body.message, req.body.to);
        if(messageId){
            return res.send(messageId);
        }
    } catch(e){
        return res.send(e);
    }
})