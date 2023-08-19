const db = require('./db');

async function getUser() {
    const data = await db.query(`select * from dogether.titles`);
    return data;
}

module.exports = {
    getUser
}