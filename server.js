//REST API Backend
const cors = require('cors'); //Cross Origin Resource Sharing
const express = require('express');
const app = express();
const port = 3000;

//Middleware - köztes alkalmazások
app.use(express.json());
app.use(cors());


//Máveleteket végrehajtó végpont
app.post('/api/math/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    let result;
    if (operation == "add") {
        result = num1 + num2;
    } 
    else if (operation == "subtract") {
        result = num1 - num2;
    }
    else {
        return res.status(400).json({ error: 'Érvénytelen művelet!' });
    }

    res.json({ result });

});

//A webszerver elindítása
app.listen(port, () => {
    console.log(`A szerver fut a  http://localhost:${port} porton`);
});