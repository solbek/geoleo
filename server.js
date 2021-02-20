const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();
const db = require("./js/db.js");  
//const db = pgp('postgres://postgres:aa@localhost:5432/geoleo');

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

//-------------------- ADD NEW  --------------------------------
app.post('/app/new', async function (req, res, next) {
    let name = req.body.name;
    let cat = req.body.cat;
    let img = req.body.img;
    let capital = req.body.capital;
    let txt = req.body.txt;
    let cur = req.body.cur;
    let code = req.body.code;
    let whatToDo = req.body.whatToDo;

    if (whatToDo === "new country") {
        let query = `INSERT INTO public."countries"("name", "category", "capital","info", "flag","currency","code") VALUES('${name}', '${cat}', '${capital}', '${txt}', '${img}', '${cur}','${code}') RETURNING *`;
        console.log("query " + query);

        try {
            let result = await db.any(query);
            if (result.rows.length > 0) {
                res.status(200).json({
                    msg: "Hello, " + result.rows[0].name + result.rows[0].capital,
                    name: result.rows[0].name,
                    capital: result.rows[0  ].capital
                }).end();
            } else {
                res.status(500).json({
                    error: "Kunne ikke legget til land i db"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
    } else if (whatToDo === "delete country") {
        //TODO: slette liste fra database
    }
});

//-------------------- CHANGE CURRENCY --------------------------------
app.post('/app/change', async function (req, res, next) {
    let name = req.body.name;
    let cur = req.body.currency;
    let info = req.body.info;
    let whatToDo = req.body.whatToDo;

    if (whatToDo === "change currency") {
        let query = `UPDATE countries SET currency = '${cur}' WHERE name = '${name}'` ;
        console.log("query " + query);
        try {
            let result = await db.any(query);
            if (result.rows.length > 0) {
                res.status(200).json({
                    msg: "Hello, " + result.rows[0].cur
                }).end();
            } else {
                res.status(500).json({
                    error: "Kunne ikke redigere"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
    }
//-------------------- CHANGE / ADD INFO --------------------------------
    if (whatToDo === "change info") {
        let query = `UPDATE countries SET info = '${info}' WHERE name = '${name}'`;
        console.log("query " + query);
        try {
            let result = await db.any(query);
            if (result.rows.length > 0) {
                res.status(200).json({
                    msg: "Hello, " + result.rows[0].cur
                }).end();
            } else {
                res.status(500).json({
                    error: "Kunne ikke redigere"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
    }
});

//-------------------- GET DATA --------------------------------
app.get('/app/countries', async function (req, res) {
    let query = `SELECT * FROM public."countries";`;
    try {
        let result = await db.any(query);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.use(user);
app.use(geo);

app.listen(app.get('port'), function() {
    console.log('Listen on', app.get('port'));
});




