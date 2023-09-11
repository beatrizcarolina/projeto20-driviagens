import db from "../database/database.connection.js";

async function insert(origin, destination, date) {
    return await db.query("INSERT INTO flights (origin, destination, date) VALUES ($1 ,$2, $3)", 
    [origin, destination, date]);
};

async function selectById(id) {
    const result = await db.query("SELECT * FROM flights WHERE id = $1", [id]);
    return result.rows[0];
};

async function select() {
    let query = `
    SELECT 
        flights.id, 
        origin.name AS origin, 
        destination.name AS destination, 
        TO_CHAR(date, 'DD-MM-YYYY') AS date
    FROM flights
    JOIN cities AS origin ON flights.origin = origin.id
    JOIN cities AS destination ON flights.destination = destination.id`;

    const queryParams = [];

    if (origin) {
        query += ` WHERE origin.name = $${queryParams.length + 1}`;
        queryParams.push(origin);
    }

    if (destination) {
        if (query.includes("WHERE")) {
            query += `AND destination.name = $${queryParams.length + 1}`;S
        } else {
            query += ` WHERE destination.name = $${queryParams.length + 1}`;
        }
        queryParams.push(destination);
    }

    if (smallDateFormated && bigDateFormated) {
        if (query.includes("WHERE")) {
            query += `AND flights.date BETWEEN TO_DATE($${queryParams.length+1}, 'YYYY-MM-DD') AND TO_DATE($${queryParams.length + 2}, 'YYYY-MM-DD')`;
        } else {
            query += ` WHERE flights.date BETWEEN TO_DATE($${queryParams.length+1}, 'YYYY-MM-DD') AND TO_DATE($${queryParams.length + 2}, 'YYYY-MM-DD')`;
        }
        queryParams.push(smallDateFormated);
        queryParams.push(bigDateFormated);
    }

    query += ` ORDER BY flights.date`;

    const flights = await db.query(query, queryParams);
    return flights.rows;
};

const flightsRepository = { insert, selectById, select };
export default flightsRepository;