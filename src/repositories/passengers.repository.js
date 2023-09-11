import db from "../database/database.connection.js";

async function insert(firstName, lastName) {
    return await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2)`, [firstName, lastName]);
};

async function selectById(id) {
    const result = await db.query("SELECT * FROM passengers WHERE id = $1", [id]);
    return result.rows[0];
};

async function selectFlights(name) {
    let query = `
    SELECT 
        (passengers."firstName" || ' ' || passengers."lastName") AS passenger, 
        CAST(COUNT(travels."passengerId") AS INTEGER) AS travels
    FROM passengers
    LEFT JOIN travels ON passengers.id = travels."passengerId"`;

    const queryParams = [];

    if (name) {
        query += ` 
            WHERE passengers."firstName" ILIKE $${queryParams.length + 1} 
            OR passengers."lastName" ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${name}%`);
    }

    query += " GROUP BY passengers.id ORDER BY travels DESC";

    const flightsPerPassenger = await db.query(query, queryParams);
    return flightsPerPassenger.rows;
};

const passengersRepository = { insert, selectById, selectFlights };
export default passengersRepository;