//Länkar alla program
const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//ROUTES

//Route för att hämta data från API
app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till mitt API"});
});

//Route för att hämta data om jobberfarenheter från API
app.get("/api/workexperience", (req, res) => {
    res.json({ message: "Hämta jobberfarenheter"});
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
    if (!id || !companyname || !jobtitle || !location || !startdate || !enddate || !description) {

        errors.message = "Saknar information om arbetserfarenheten.";
        errors.details = "Du har inte fyllt i alla rutor i formuläret.";

        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        //Stoppar posten från att sändas om något saknas
        return;
    }

    //Ger våra parametrar sina värden innan dom skickas till API i JSON-format
    let workexperience = {
        id: id,
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    }

    res.json({ message: "Ny jobberfarenhet tillagd", workexperience});
});

//Route för att redigera befintlig data från API (Ej klar, bara ett skal)
app.put("/api/workexperience/:id", (req, res) => {
    res.json({ message: "Jobberfarenhet uppdaterad: " + req.params.id});
});

//Route för att radera data från API (Ej klar, bara ett skal)
app.delete("/api/workexperience/:id", (req, res) => {
    res.json({ message: "Jobberfarenhet raderad: " + req.params.id});
});

//Lyssnar på angiven port
app.listen(port, () => {
    console.log("Servern är startad på port: " + port);
});