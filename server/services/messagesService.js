const db = require('./db');

async function getMessages(groupId, phone) {
   
    const data = await db.query(`
    select 
    m.title,
    m.content,
    m.date,
    m.from,
    sm.status,
    sm.id as sm_id,
    g.manager_phone,
    u.first_name,
    u.last_name
    from dogether.messages m
    join dogether.status_messages sm
    on sm.id_message = m.id
    join dogether.groups g
    on g.id = sm.group
    join dogether.users u
    on u.phone = m.from
    where sm.phone = ${phone} and sm.group = ${groupId}
    order by m.date
    `);
    return data;
}

async function putMessages(body) {
    const arr = [...body.ids];
    let size = arr.length;
    for (i = 0; i < size; i++) {
        await db.query(`
        update dogether.status_messages sm
        set sm.status = 1
        where sm.id = ${arr[i]}
        `)
    }
}

async function postMessage(body) {
    try {
        await db.query(`
        insert into dogether.messages
        values(default,${JSON.stringify(body.title)},${JSON.stringify(body.content)},${JSON.stringify(body.date)},${JSON.stringify(body.from)},${body.group})
        `);
    }
    catch {
        return "can`t adding a message"
    }

    const id = await db.query(`
    select 
    max(id) as id
    from dogether.messages m
    where m.from = ${body.from}
    `);

    const arr = [...body.phones];
    const size = arr.length;
    for (i = 0; i < size; i++) {
        console.log(arr[i]);
        console.log(body.from);

        if (arr[i] == body.from) {
            console.log('fffffffffffff');
            await db.query(`
            insert into dogether.status_messages
            values(default,${JSON.stringify(arr[i])},1,${body.group},${id[0].id})
            `)
           
        }
        else {
            await db.query(`
            insert into dogether.status_messages
            values(default,${JSON.stringify(arr[i])},0,${body.group},${id[0].id})
            `)
        }
    }
}

module.exports = {
    getMessages,
    putMessages,
    postMessage
}