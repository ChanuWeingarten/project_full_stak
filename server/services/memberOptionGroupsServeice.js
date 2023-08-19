
const db = require('./db');

async function getGroups(phone) {
    const data = await db.query(`
    select 
    m.id,
    g.name,
    g.description,
    g.title 
    from dogether.groups g
    join dogether.members m
    on m.group_id = g.id
    where m.phone =${phone} and m.status_join = 0;
    `)
    return data;
}

async function putGroup(body) {
    const arr = [...body.ids];
    let size = arr.length;
    for (i = 0; i < size; i++) {
        await db.query(`
        update dogether.members m
        set m.status_join = 1
        where id = ${arr[i]};
        `)
    }

}

module.exports = {
    getGroups,
    putGroup
}