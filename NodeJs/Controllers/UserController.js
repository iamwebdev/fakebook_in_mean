var express = require('express');
var router = express.Router();
var User = require('../Models/User');

router.post('/register', (req, res) => {
    User.find({email: req.body.email}).countDocuments((err, count) => {
        if (!err)
            if(count > 0) {
                return res.json({status: false, message: 'Email already exists'})
            }
            else {
                var userData = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                userData.save((err, docs) => {
                    if (!err)
                        return res.json({status: true, message: 'Registered Successfully'})
                    else
                        return res.json({status: false, message: 'Something went wrong'})
                });
            }
        else
            return res.json({status: false, message: 'Something went wrong'})
                       
    })
})

module.exports = router