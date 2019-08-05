var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendSchema = new Schema({
    sender_id: {type: mongoose.Types.ObjectId, ref: 'User'},
    reciever_id: {type: mongoose.Types.ObjectId, ref: 'User'},
    status: {type: Boolean,default:0}
})

module.exports = mongoose.model('Friend',friendSchema);