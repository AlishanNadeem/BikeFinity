const User = require('../models/User.model');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.UserLogin = ((req, res, next) => {
    let expiration = 3600; //expires in one min

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.send({
            status: 404,
            msg: 'User not found'
        }); //res.status(404).send("User not found"); how to check status code from frontend

        var passwordValidity = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordValidity) return res.send({
            auth: false,
            token: null,
            status: 401,
            msg: 'Unauthorized'
        }); //res.status(401).send({ auth: false, token: null })

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: expiration
        });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            req.decoded = decoded;
        });

        res.status(200).send({ auth: true, token: token, expiry: req.decoded.exp });
    });
});

exports.UserSignup = ((req, res, next) => {
    let user = new User({
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        location: req.body.location,
        profilePicture: req.body.profilePicture,
    });

    user.save((err) => {
        if (err) return next(err);

        res.send("User registered successfully");
    })
});

exports.checkUser = ((req, res, next) => {
    User.findOne({
        email: req.params.email
    }, (err, user) => {
        if (err) return next(err);

        if (user) {
            res.send({
                message: 'User already exists',
                status: true
            })
        }
        else {
            res.send({
                message: 'User does not exists',
                status: false
            })
        }
    })
});