//Länkar alla program
const express = require('express');
const cors = require("cors");
const { Client, Connection } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

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

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//Route för förstasidan
app.get('/', (req, res) => {
    res.render("index");
});

//Route för att hämta data från API
app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till mitt API" });
});

//Route för att hämta data om jobberfarenheter från API
app.get("/api/workexperience", (req, res) => {

    //Hämta jobberfarenheter
    client.query(`SELECT * FROM workexperience;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något gick fel..." + err });
            return;
        }

        if (results.rows.length === 0) {
            res.status(404).json({ message: "Inga jobberfarenheter hittade." })
        } else {
            res.json(results.rows);
        }
    })

});

//Route för att posta data om jobberfarenhet till API
app.post("/api/workexperience", (req, res) => {

    let id = req.body.id;
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //Hantering av felmeddelanden
    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    };

    //Mer detaljerat felmeddelande om något saknas.
    if (!companyname || !jobtitle || !location || !startdate || !description) {

        errors.message = "Saknar information om arbetserfarenheten.";
        errors.details = "Du har inte fyllt i alla rutor i formuläret.";

        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        //Stoppar posten från att sändas om något saknas
        return;
    }

    //Lägg till jobberfarenhet
    client.query(`INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6)`, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något gick fel..." + err });
            return;
        }

        console.log("Fråga skapad: " + results)

        //Ger våra parametrar sina värden innan dom skickas till API i JSON-format
        let workexperience = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        }

        res.json({ message: "Ny jobberfarenhet tillagd", workexperience });
    });

});

//Route för att redigera befintlig data från API (Ej klar, bara ett skal)
app.put("/api/workexperience/:id", (req, res) => {
    res.json({ message: "Jobberfarenhet uppdaterad: " + req.params.id });
});

//Route för att radera data från API (Ej klar, bara ett skal)
app.delete("/api/workexperience/:id", (req, res) => {
    const id = req.params.id;

    //Radera posten från databasen
    client.query(`DELETE FROM workexperience WHERE id = $1`, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Något gick fel..." + err });
            return;
        }

        if (results.rowCount === 0) {
            res.status(404).json({ message: `Ingen jobberfarenhet med id ${id} hittades.` })
        } else {
            res.json({ message: `Jobberfarenhet med id ${id} har raderats.` })
        }
    });
});

//Lyssnar på angiven port
app.listen(port, () => {
    console.log("Servern är startad på port: " + port);
});