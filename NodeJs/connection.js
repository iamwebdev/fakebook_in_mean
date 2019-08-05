const mongoose = require('mongoose');
if (mongoose.connect('mongodb://localhost:27017/fakebook', {useNewUrlParser: true}))
    console.log('Mongodb Connected')
else
    console.log('Error in mongodb Connection')

module.exports = mongoose