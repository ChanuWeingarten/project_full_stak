const db = require('./db');

async function getContacts(groupId) {
    const data1 =await db.query(`
    select 
    u.first_name,
    u.last_name,
    u.email,
    u.phone
    from dogether.users u
    join dogether.groups g
    on g.manager_phone = u.phone
    where g.id = ${groupId}
    `)
    console.log(data1);

    const data2 = await db.query(`
    select 
    u.first_name,
    u.last_name,
    u.email,
    u.phone
    from dogether.users u
    join dogether.members m
    on m.phone = u.phone
    join dogether.groups g
    on g.id = m.group_id
    where g.id = ${groupId}
    `);
    console.log(data1);
    data2.push(data1[0])
    console.log(data2);

    return data2;
}

module.exports = {
    getContacts
}