//REST API kliens megvalósítása Promise .then .catch láncolással.
/*REST API kliens megvalósítása Promise .then .catch módszerrel (aszinkron függvényhívás).
Az aszinkron művelet visszatérési értéke egy Promise objektum.
A Promise objektum állapotai:
1. pending: várakozás az API-al való kapcsolatra
2. fullfilled: kapcsolat létrejött
3. rejected: kapcsolat visszautasítva
*/

function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    if(isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Kérem adjon meg egy számot!";
        return;
    }
    fetch('http://localhost:3000/api/math/calculate',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1, num2, operation })
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba történt a kérés feldolgozása során!');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('result').textContent = data.result;
    })
    .catch(error => {
        document.getElementById('result').textContent = `Hiba: ${error.message}`;
    });
    
}