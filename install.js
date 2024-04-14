const { Client } = require("pg");
require("dotenv").config();

//Anslut till databasen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning: " + err);
    } else {
        console.log("Ansluten till databasen...");
    }
});

//Skapa tabell i databasen
client.query(`
DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience(
        id              SERIAL PRIMARY KEY,
        companyname     VARCHAR(30),
        jobtitle        VARCHAR(30) NOT NULL,
        location        VARCHAR,
        startdate       DATE,
        enddate         DATE,
        description     TEXT
    )`
)