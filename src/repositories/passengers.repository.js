import db from "../database/database.connection.js";

async function insert(firstName, lastName) {
    return await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2)`, [firstName, lastName]);
};

async function selectById(id) {
    const result = await db.query("SELECT * FROM passengers WHERE id = $1", [id]);
    return result.rows[0];
};

const passengersRepository = { insert, selectById };
export default passengersRepository;