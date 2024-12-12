//REST API Backend
const cors = require('cors'); //Cross Origin Resource Sharing
const express = require('express');
const app = express();
const port = 3000;

//Middleware - köztes alkalmazások
app.use(express.json());
app.use(cors());


//Műveleteket végrehajtó végpont
app.post('/api/math/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    //Ellenőrizzük hogy mind a két szám létezik és szám típus
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Hiányzó, vagy érvénytelen számok'})
    }

    let result;
    if (operation == "add") {
        result = num1 + num2;
    } 
    else if (operation == "subtract") {
        result = num1 - num2;
    }
    else {
        return res.status(400).json({ error: 'Érvénytelen művelet' });
    }

    res.json({ result });

});

//A webszerver elindítása
//A Unit teszthez szükésges módosítások!
//Csak akkor indul el a szerver, ha mi adjuk ki a "node server.js" parancsot, egyébként nem.
if (require.main === module) {


app.listen(port, () => {
    console.log(`A szerver fut a  http://localhost:${port} porton`);
});
}
//Exportáljuk az alkalmazásunkat
module.exports = app;