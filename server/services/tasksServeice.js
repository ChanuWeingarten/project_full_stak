const db = require('./db');

async function getTasks(id, phone) {
    const data = await db.query(`
    select 
    st.id as statusTaskId,
    t.description,
    t.start_date,
    t.final_date,
    st.status,
    st.task,
    t.score
    from dogether.tasks t
    join dogether.status_task st
    on t.group = st.group and t.task = st.task
    where st.phone = ${phone} and t.group = ${id}
    order by t.start_date
    `);
    return data;
}


async function putTasks(id, body) {
    await db.query(`
    update dogether.status_task st
    set st.status = ${body.status}
    where st.id = ${id};
    `);
    let score = await db.query(`
    select m.score
    from dogether.members m
    where m.id = ${body.memberId}
    `);
    let score1 = score[0].score + body.score
    let score2 = score[0].score - body.score
    if (body.status == 1) {
        await db.query(`
        update dogether.members m
        set m.score =${score1}
        where m.id = ${body.memberId}
        `);
        return score1;
    }
    else {
        await db.query(`
        update dogether.members m
        set m.score = ${score2}
        where m.id = ${body.memberId};
        `);
        return score2;
    }

}

async function postTask(id, body) {
    await db.query(`
    insert into dogether.tasks
    values(default,${id},${body.task},${JSON.stringify(body.description)},${JSON.stringify(body.start_date)},${JSON.stringify(body.final_date)},${body.score})
    `);

    const arr = [...body.phones];
    const size = arr.length;

    for (i = 0; i < size; i++) {
        await db.query(`
        insert into dogether.status_task
        values(default,${JSON.stringify(arr[i])},${id},${body.task},0)
        `)
    }
}


module.exports = {
    getTasks,
    putTasks,
    postTask
}