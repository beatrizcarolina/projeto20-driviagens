import db from "../database/database.connection.js";

async function insert(passengerId, flightId) {
    return await db.query(`INSERT INTO travels ("passengerId", "flightId") VALUES ($1 ,$2)`, 
    [passengerId, flightId]);
};

const travelsRepository = { insert };
export default travelsRepository;