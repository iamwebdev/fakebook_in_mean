var express = require('express')
var router = express.Router();
var User = require('../Models/User');
var Friend = require('../Models/Friend');
var Message = require('../Models/Message');
var Post = require('../Models/Post');

const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
router.post('/signin',(req, res) => {
    if (!req.body.email) {
        return res.json({ status: false, message: 'Email not provided' })
     } else {
         if (!req.body.password) {
             return res.json({ status: false, message: 'Password not provided' })
         } else {
             User.findOne({email: req.body.email, password: req.body.password}, (err, doc) => {
                 if (err) {
                    return res.json({ status: false, message: 'Something went wrong' })
                 }
                 else {
                     if (!doc) {
                         return res.json({status:false ,message: 'Wrong Credentials'})
                     } else {
                         const token = jwt.sign({ userId: doc._id },'shhhhh',{expiresIn: '24h'}) 
                         return res.json({status: true, message: 'Logged in', token: token, user: {username: doc.name, id: doc._id}});
                     }
                 }
             })
         }
     }
})

router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.json({status: false, message: 'Token not found'})
    } else {
        jwt.verify(token, 'shhhhh', (err, decoded) => {
            if (err) {
                res.json({status: false, message: 'Token invalid: '+err})
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
});

router.get('/get-profile', (req, res) => {
    User.findOne({_id: req.decoded.userId})
        .select('name id email')
        .exec((err, doc) => {
        if (err) {
            return res.json({status: false, message: 'Something  went wrong'});
        } else {
            if (!doc) {
                return res.json({status:false ,message: 'User not found'});
            } else {
                return res.json({status: true, user: doc });
            }
        }
    })
})

router.get('/get-suggestions',(req, res) => {
    Friend.find({sender_id: req.decoded.userId})
    .exec((err, docs) => {
            var ids = docs.map(function(doc){ return doc.reciever_id; });
            Friend.find({reciever_id: req.decoded.userId, status: true},(err, docs) => {
                var send_ids = docs.map(function(doc){ return doc.sender_id; });
                ids.push(send_ids)
                ids.push(req.decoded.userId);
                User.find({ _id: { $nin: ids}})
                    .exec((err, docs) => {
                        console.log(docs)
                        if (!err) {
                            return res.json({status:true ,data: docs});
                        } else {
                            return res.json({status: false });
                        }
                })
            })
        })
})

router.post('/send-friend-request',(req, res) => {
    var senderId = req.decoded.userId
    var recieverId = req.body.rec_id
    var friendData = new Friend({
        sender_id: senderId,
        reciever_id: recieverId
    });
    friendData.save((err, doc) => {
        if(!err) {
            return res.json({status: true, message: 'Request sent'})
        } else {
            return res.json({status: false, message: 'Sorry something went wrong'})
        }
    })
})

router.get('/sent-request-list',(req, res) => {
    Friend.find({sender_id: req.decoded.userId, status: false})
        .populate('reciever_id')
        .exec((err, docs) => {
            if (!err) {
                return res.json({status:true ,data: docs});
            } else {
                return res.json({status: false });
            }
        })
})

router.get('/recieved-request-list',(req, res) => {
    Friend.find({reciever_id: req.decoded.userId, status: false})
        .populate('sender_id')
        .exec((err, docs) => {
            if (!err) {
                return res.json({status:true ,data: docs});
            } else {
                return res.json({status: false });
            }
        })
})

router.get('/friend-list',(req, res) => {
    Friend.find({ reciever_id: req.decoded.userId, status: true},(err, docs) => {
        if (!err) {
            var friendIds = docs.map(function(doc){ return doc.sender_id; });
            Friend.find({ sender_id: req.decoded.userId, status:true },(err, docs) => {
                if(!err) {
                    var send_ids = docs.map(function(doc){ return doc.reciever_id });
                    friendIds.push(send_ids)
                    User.find({_id: {$in: friendIds}},(err,docs) => {
                        res.json({status: true, data: docs})
                    })
                } else {
                    return res.json({status:true ,data: docs});
                }                    
            })
        } else {
            return res.json({status: false });
        }
    })
})

router.get('/action-on-request/:action/:sender_id',(req,res) => {
    if (req.params.action == 'accept') {
        Friend.updateOne({sender_id: req.params.sender_id, reciever_id: req.decoded.userId}, {
            status: true, 
        }, (err, doc) => {
            if (!err) {
                return res.json({status:true ,message: 'Request Accepted'});
            } else {
                return res.json({status: false, message: 'Something went wrong' });
            }
        })
    } else {
        Friend.remove({sender_id: req.params.sender_id, reciever_id: req.decoded.userId},(err, doc) => {
            if (!err) {
                return res.json({status:true ,message: 'Request Declined'});
            } else {
                return res.json({status: false, message: 'Something went wrong' });
            }
        })
    }
})

router.post('/send-message',(req,res) => {
    var convoId = uuidv1();
    Message.findOne({send_id: req.decoded.userId,rec_id: req.body.reciever},(err, docs) => {
        if (!err && docs) {
            convoId = docs.convo_id
        } else {
            Message.findOne({send_id: req.body.reciever,rec_id: req.decoded.userId},(err, docs) => {
                if (!err && docs) {
                    convoId = docs.convo_id   
                }
            })
        }
    }).then(()=>{
        setTimeout(()=>{
            var formData = new Message({
                send_id: req.decoded.userId,
                rec_id: req.body.reciever,
                convo_id: convoId,
                message: req.body.message
            });
            formData.save((err, doc) => {
                if(!err) {
                    return res.json({status: true, message: 'Message sent'})
                } else {
                    return res.json({status: false, message: 'Sorry something went wrong'})
                }
            })
        },3000)
    })
})

router.get('/get-conversation',(req,res) => {
    Message.find({ rec_id: req.decoded.userId},(err, docs) => {
        if (!err) {
            var friendIds = docs.map(function(doc){ return doc.send_id; });
            Message.find({ send_id: req.decoded.userId },(err, docs) => {
                if(!err) {
                    var userIds = docs.map(function(doc){ return doc.rec_id });
                    var chatUserIds = friendIds.concat(userIds);
                    User.find({_id: {$in: chatUserIds}},(err, docs) => {
                        return res.json({status:true ,data: docs});
                    })
                } else {
                    return res.json({status:true ,data: docs});
                }                    
            })
        } else {
            return res.json({status: false });
        }
    })
})

router.get('/get-messages/:user_id',(req,res) => {
    var conversationId = null
    Message.findOne({send_id: req.params.user_id,rec_id: req.decoded.userId},(err, doc) => {
        if(doc) {
            conversationId = doc.convo_id
            // console.log('first', conversationId)
        } else {
            Message.findOne({rec_id: req.params.user_id,send_id: req.decoded.userId},(err, doc) => {
                if (doc) {
                    conversationId = doc.convo_id
                    // console.log('second',conversationId)    
                }
            })
        }
    }).then(()=> {
        setTimeout(()=>{
            Message.find({convo_id: conversationId})
                    .populate('send_id')
                    .populate('rec_id')
                    .exec((err, docs) => {
                        if(!err && docs) {
                            // console.log('third',conversationId,docs)
                            return res.json({status: true, data: docs})
                        }
                        else{
                            return res.json({status: false})    
                        }
            })
        },2000)
    })
})

router.post('/share-post',(req,res) => {
    var today = new Date();
    var postData = new Post({
        user_id: req.decoded.userId,
        post: req.body.post,
        post_date: today
    })
    postData.save((err, doc) => {
        if(!err) {
            return res.json({status: true, message: 'Post shared'})
        } else {
            return res.json({status: false,message: 'Something went wrong'})
        }
    })
})

router.get('/get-posts',(req,res) => {
    Post.find({user_id: req.decoded.userId})
    .populate('user_id')
    .exec((err, docs) => {
        if(!err) {
            return res.json({status: true, data: docs})
        } else {
            return res.json({status: false})
        }
    })
})
module.exports = router;