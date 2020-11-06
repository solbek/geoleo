const pgp = require('pg-promise')();

//db connect string
const db = pgp('postgres://postgres:aa@localhost:5432/geoleo');

//prepared sql statements we are going to use
const PrpSt = require('pg-promise').PreparedStatement;
const ps = {}; //object that contains the statements

/*ps.listAll = new PrpSt('listAll', 'SELECT * FROM travelsview');
ps.addTravel = new PrpSt('addTravel', 'INSERT INTO travels VALUES(DEFAULT, $1, $2, $3, $4)');
ps.delTravel = new PrpSt('delTravel', 'DELETE FROM travels WHERE id=$1 RETURNING *');*/

//export module
module.exports.db = db; //db connection
module.exports.ps = ps; //prepared sql statements
