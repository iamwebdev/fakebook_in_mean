const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./connection');
var UserController = require('./Controllers/UserController');
var AuthController = require('./Controllers/AuthController');
var FriendController = require('./Controllers/FriendController');
const uuidv1 = require('uuid/v1');
var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000,() => console.log('Express Connected'));
app.use('/', UserController)
app.use('/',FriendController)
app.use('/',AuthController)
