const initDB = require('./connexionMongo');
const connection = initDB();
const faker = require('faker');

let client;
let database;

/* //logic de Fibonacci
            let fib = 0;
            let fib1 = 0;
            let fib2 = 1;
            for (let j = 0; j < i; j++) {
                fib = fib1 + fib2;
                fib2 = fib1;
                fib1 = fib; 
            }
            console.log(fib);
*/
const newPurchaser = (id) => {
    return {
    id: id,
    firstName: faker.Name.firstName(),
    lastName: faker.Name.lastName(),
    };
};

async function getConnexion(db) {
    client = await connection;
    database = client.db(db);
}

async function insertData() {

    try {
        await getConnexion("Humongusv3");
        const collectionPurchasers = database.collection("purchasers");
        for(let i = 0; i < 50; i++) {
           console.log(newPurchaser(i));
            const result = await collectionPurchasers.insertOne(newPurchaser(i));
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        }
        await insertPurchasersIntoComputers();
    } catch (err) {
        console.error("Failed to insert document:", err);
    } finally {
        if (client)
            await client.close();
    }
}

async function insertPurchasersIntoComputers(){

    try{
        await getConnexion("Humongusv3");
        const collectionComputers = database.collection("computers");
        for(let i = 0; i < 10; i++) {
            let fib = 0;
            let fib1 = 0;
            let fib2 = 1;
            for (let j = 0; j < i; j++) {
                fib = fib1 + fib2;
                fib2 = fib1;
                fib1 = fib; 
            }

            const result = await collectionComputers.updateOne({"computer_id": (i+1).toString()}, {$set: {"purchaser_id": fib}});
            console.log(result);
        }
    }catch(err){
        console.error("Failed to insert document:", err);
    } finally {
        if (client)
            await client.close();
    }
}

insertData();
