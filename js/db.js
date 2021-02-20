/*const pgp = require('pg-promise')();

//db connect string
const db = pgp('postgres://postgres:aa@localhost:5432/geoleo');

//prepared sql statements we are going to use
const PrpSt = require('pg-promise').PreparedStatement;
const ps = {}; //object that contains the statements

ps.listAll = new PrpSt('listAll', 'SELECT * FROM travelsview');
ps.addTravel = new PrpSt('addTravel', 'INSERT INTO travels VALUES(DEFAULT, $1, $2, $3, $4)');
ps.delTravel = new PrpSt('delTravel', 'DELETE FROM travels WHERE id=$1 RETURNING *');

//export module
module.exports.db = db; //db connection
module.exports.ps = ps; //prepared sql statements*/

const pg = require("pg");

const { Client } = require('pg');

let connectionString = process.env.DATABASE_URL;

connectionString += "?ssl=true";

const db = {}

async function runQuery(query) {
  let respons = null;
  const client = new Client({
    connectionString: connectionString,
    ssl: true
  })

  try {

    // Wait untill we have a connection to the database
    await client.connect();

    console.log("connected");

    // Waite untill the prommise has completed
    let res = await client.query(query).then(function (res) {
      // If you want to manipulate the respons it can be done in her.

      return res;
    }).catch(function (err) {
      console.log(err);
    });

    respons = res;

  } catch (e) {
    console.log("Error ");
    console.log(e);
    /*OOPS*/
  }

  return respons;

}
