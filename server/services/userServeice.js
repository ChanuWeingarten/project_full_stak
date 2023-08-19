const db = require('./db');

async function getUser(phone, body) {
    const data = await db.query(`select * from dogether.users where phone=${phone} and password=${JSON.stringify(body.password)}`);
    return data;
}

async function postUser(body) {
    const d = await db.query(`select * from dogether.users where phone=${body.phone} and password=${JSON.stringify(body.password)}`);
    if (!d[0]) {
        await db.query(`insert into dogether.users values
    (default
    ,${JSON.stringify(body.phone)}
    ,${JSON.stringify(body.first_name)}
    ,${JSON.stringify(body.last_name)}
    ,${JSON.stringify(body.email)}
    ,${JSON.stringify(body.password)})`);

        const data = await db.query(`
    select 
    u.id
    from dogether.users u
    where u.phone = ${JSON.stringify(body.phone)}
    `);
        return data;
    }
    else {
        return null
    }
}

module.exports = {
    getUser,
    postUser
}

