const User = require('../models/User.model');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.UserLogin = ((req, res, next) => {
    let expiration = '7d'; //expires in seven days

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

        User.findById(req.decoded.id, (err, user) => {
            if (err) return next(err)

            res.status(200).send({ auth: true, token: token, expiry: req.decoded.exp, userId: req.decoded.id, user: user });
        })
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

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cs1812102@szabist.pk',
                pass: 'szabistsucks'
            }
        });

        let mailDetails = {
            from: 'info@bikefinity.pk <noreply@bikefinity.pk>',
            to: user.email,
            subject: 'Welcome to BikeFinity',
            text: `Hi ${user.name},\n\nWelcome to Bikefinity and thankyou for signing up with us. From now on you will get regular updates on biking events in your desired city and since you are now a premium member of Bikefinity, you can advertise the sell of your bike at no cost or browse thousands of bike for your daily or predilection bike.\n\nKeep an eye on reviews tab as we'll be sending you the best bike for your desired budget. Let's get you a healthy and bubbly experience.\n\nCheers,\nBikeFinity`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                res.send("User registered successfully");
            }
        });
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