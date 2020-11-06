const express = require('express')
const router = express.Router();
const db = require("./db.js"); 
const bodyParser = require('body-parser');
//const authorize = require("./auth.js");
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');

//const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingMonkeys";

router.post('/app/edit', async function (req, res, next) {
                let name = req.body.name;
                let capital = req.body.captal;
                let whatToDo = req.body.whatToDo;

                if (whatToDo === "new country") {
                                let query = `INSERT INTO public."countries"("name", "capital") VALUES(, '${name}', '${capital}') RETURNING *`;
                                console.log("query " + query);

                                try {
                                                let result = await db.insert(query);
                                                if (result.rows.length > 0) {
                                                                res.status(200).json({
                                                                                msg: "Hello, " + result.rows[0].name + result.rows[0].capital,
                                                                                name: result.rows[0].name,
                                                                                capital: result.rows[0].capital
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

/*router.get('/app/land', async function(req, res){
    res.set('Accsess-Control-Allow-Origin', '*');
    res.set("Accsess-Control-Allow-Methods", "GET, PUT, POST DELETE");

    var sql = 'SELECT * FROM countries';

    try{
        var datarow = await db.any(sql);
        res.status(200).json(datarow);
    }
    catch(err){
        res.status(500).json({error: err});
    }req.body.active;
});*/

module.exports = router;