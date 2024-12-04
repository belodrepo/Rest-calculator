//REST API kliens megvalósítása Promise .then .catch láncolással.
/*REST API kliens megvalósítása Promise .then .catch módszerrel (aszinkron függvényhívás).
Az aszinkron művelet visszatérési értéke egy Promise objektum.
A Promise objektum állapotai:
1. pending: várakozás az API-al való kapcsolatra
2. fullfilled: kapcsolat létrejött
3. rejected: kapcsolat visszautasítva
*/
//Átveszi a műveletet a Html-ből és eléri az input mezőkben megadott értékeket.
function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
//Megvizsgáljuk, hogy kapott-e értéket a két input mező.
    if(isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Kérem adjon meg egy számot!";
        return;
    }
/*REST API végpont elérése és az adatok aszinkron 
elküldése a végpontnak JSON formátumban.*/
    fetch('http://localhost:3000/api/math/calculate',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1, num2, operation })
    })
//Első .then: ha nem jött adat az API-tól, hibaüzenetet ad vissza
    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba történt a kérés feldolgozása során!');
        }
//Egyébként visszaadja az API-tól érkezett adatokat a response objektumban.
        return response.json();
    })
//Második .then: az API-tól érkezett eredmény megjelenítése a Html-ben.
    .then(data => {
        document.getElementById('result').textContent = data.result;
    })
//Hibaüzenet megjelenítése a Html-ben az eredmény helyén.
    .catch(error => {
        document.getElementById('result').textContent = `Hiba: ${error.message}`;
    });
    
}