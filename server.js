//REST API backend egyszerű számolási műveletek végrehajtására

const express = require('express');
const cors = require('cors'); //Cross Origin Resource Sharing
const app = express();
const port = 3000;

//Midlleware - köztes alkalmazások
app.use(express.json()); //JSON kezelés
app.use(cors()); //A CORS-t felvettük a Middleware-k közé

//A műveleteket végrehajtó POST végpont
app.post('/api/math/calculate', (req, res) => {
    const { num1, num2, operation } = req.body; //Változók átvétele a klienstől érkező üzenet törzséből
    //Számolási logika
    let result;
    if (operation == 'add') {
        result = num1 + num2;
    }
    else if (operation == 'subtract') {
        result = num1 - num2;
    }
    else{
        return res.status(400).json({ error: 'Érvénytelen művelet'}); //Státusz kód és hibaüzenet visszadaása
    }

    res.json({ result }); //Az eredmény elküldése a klinsnek JSON formátumban
});

//A szerver elindítása a megadott portszámon (3000)
app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port}`); //Kiírja hogy fut a szerver
});