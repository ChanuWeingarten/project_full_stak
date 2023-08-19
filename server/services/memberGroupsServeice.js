
const db = require('./db');

async function getGroups(phone) {
    const data = await db.query(`
    select 
	g.id,
    g.name,
    g.description,
    g.title,
    m.id as member_id,
    m.score
    from dogether.groups g
    join dogether.members m
    on m.group_id = g.id
    join dogether.titles t
    on t.id = g.title
    where m.phone = ${JSON.stringify(phone)} and m.status_join = 1
    `)
    return data;
}

module.exports = {
    getGroups,
}