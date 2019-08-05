var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
    send_id : {type: mongoose.Types.ObjectId, ref: 'User'},
    rec_id: {type: mongoose.Types.ObjectId, ref:'User'},
    convo_id: {type: String},
    message: {type:String}
})

module.exports = mongoose.model('Message',messageSchema)