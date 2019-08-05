var mongoose = require('mongoose');
var schema = mongoose.Schema

var postSchema = new schema({
    user_id: {type: mongoose.Types.ObjectId, ref:'User'},
    post : {type: String},
    post_date: {type: Date}
});

module.exports = mongoose.model('Post', postSchema)