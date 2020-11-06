  
const express = require('express')
const router = express.Router();
const db = require("./db.js"); 
const bodyParser = require('body-parser');
const authorize = require("./auth.js");
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');

const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingMonkeys";

module.exports = router;