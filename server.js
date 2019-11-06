const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js");  
const user = require("./js/user.js"); 
const geo = require("./js/geo.js")

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server har failet');
    next();    
});

app.use(user);
app.use(geo);

app.listen(app.get('port'), function() {
    console.log('Test', app.get('port'));
});


