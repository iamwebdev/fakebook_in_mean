var express = require('express');
var router = express.Router();
var Friend = require('../Models/Friend');

router.get('/delete-request/:id',(req,res) => {
    Friend.findByIdAndDelete(req.params.id,(err, docs) => {
        if(!err) 
            return res.json({status: true,message:'Request removed'})
        else
            return res.json({status: false,message:'Something went wrong'})
    })

    
});

module.exports = router;