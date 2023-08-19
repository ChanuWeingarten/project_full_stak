const db = require('./db');

async function getGroup(groupId) {
    const data = await db.query(`
    select 
    u.phone,
    me.status_join,
    u.first_name,
    u.last_name,
    me.score,
    u.phone,
    u.email
    from dogether.members me
    join dogether.groups g
    on me.group_id = g.id
    join dogether.users u
    on u.phone = me.phone
    where g.id = ${groupId}
    order by me.score
    `);
    return data;
}

async function deleteGroup(groupId) {
    await db.query(`
    delete from dogether.groups g
    where g.id = ${groupId}
    `);
    await db.query(`
    delete from dogether.members m 
    where m.group_id = ${groupId}
    `);
    await db.query(`
    delete from dogether.tasks t
    where t.group = ${groupId}
    `);
    await db.query(`
    delete from dogether.status_task st 
    where st.group = ${groupId}
    `);
    await db.query(`
    delete from dogether.messages m 
    where m.group = ${groupId}
    `);
    await db.query(`
    delete from dogether.status_messages sm 
    where sm.group = ${groupId}
    `);
}

module.exports = {
    getGroup,
    deleteGroup
}