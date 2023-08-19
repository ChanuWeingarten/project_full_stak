
const db = require('./db');

async function getGroups(phone) {
    const data = await db.query(`
    select 
    g.id,
    g.name,
    g.title,
    g.description,
    t.name as titleName
    from dogether.groups g
    join dogether.titles t
    on t.id = g.title
	where g.manager_phone = ${JSON.stringify(phone)}`)
    return data;
}

async function postGroup(phone,body) {

    await db.query(`
    insert into dogether.groups values(default,
    ${JSON.stringify(body.name)},
    ${body.title},
    ${JSON.stringify(body.description)},
    default,default,${JSON.stringify(phone)}
    )`);
    const data = await db.query(`
    select max(id) as id
    from dogether.groups g
    where g.manager_phone = ${JSON.stringify(phone)}
    `)
    console.log(data);
    return data;
}

module.exports = {
    getGroups,
    postGroup
}