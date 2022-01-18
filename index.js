const express = require('express');
const cors = require('cors');
const app = express();
const port = 4201;
const bodyParser = require("body-parser");
const sanitizer = require('sanitize')();
var crypto = require('crypto');
const fs = require('fs');

// utilisation des middleware
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// route vers l'application
app.use('/', express.static('dist/blaguespourries'));

// enregistrement du formulaire de contact
app.post("/contact", (req, res)=>
{
    // recupération et verification
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const message = req.body.message

    // enregistrement dans un fichier
    let data = `${firstname}${lastname}${message}`;
    const filename = crypto.createHash('sha256').update(data).digest('hex') + ".txt";
    fs.writeFileSync(`./contact/${filename}`, `${firstname} ${lastname}\n${email}\n${message}`);

    res.status(200).send();
});


// lancement du serveur
app.listen(port,  () =>
{
    console.log(`Le serveur backend RFF lancé sur le port ${port}!`);
});