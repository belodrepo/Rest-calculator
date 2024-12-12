/*UNIT TEST*/
//A REST API backend (server.js) tesztelési kódja /
const request = require('supertest');
const app = require('../server');

describe('POST /api/math/calculate', () => { //Ez csak egyszer kell!
    test('Összeadás tesztelése (2 + 3)', async () => { //Teszt művelet leírása
        const response = await request(app) //Szerverünk meghívása
        .post('/api/math/calculate') //Végpont elérése
        .send({ num1: 2, num2: 3, operation: 'add'}); //Változók (értákek átadása)

        expect(response.statusCode).toBe(200); //Státuszkód kérése
        expect(response.body.result).toBe(5); //Elvárt eredmény kérése
    });

    test('Kivonás tesztelése (5 - 3)', async () => { //Teszt művelet leírása
        const response = await request(app) //Szerverünk meghívása
        .post('/api/math/calculate') //Végpont elérése
        .send({ num1: 5, num2: 3, operation: 'subtract'}); //Változók (értákek átadása)

        expect(response.statusCode).toBe(200); //Státuszkód kérése
        expect(response.body.result).toBe(2); //Elvárt eredmény kérése
    });

    test('Érvénytelen művelet', async () => { //Teszt művelet leírása
        const response = await request(app) //Szerverünk meghívása
        .post('/api/math/calculate') //Végpont elérése
        .send({ num1: 2, num2: 3, operation: 'multiply'}); //Változók (értákek átadása)

        expect(response.statusCode).toBe(400); //Státuszkód kérése
        expect(response.body.error).toBe('Érvénytelen művelet'); //Elvárt eredmény kérése
    });

    test('Hiányzó számok', async () => { //Teszt művelet leírása
        const response = await request(app) //Szerverünk meghívása
        .post('/api/math/calculate') //Végpont elérése
        .send({ operation: 'add'}); //Változók (értákek átadása)

        expect(response.statusCode).toBe(400); //Státuszkód kérése
        expect(response.body.error).toBe('Hiányzó, vagy érvénytelen számok'); //Elvárt eredmény kérése
    });
});