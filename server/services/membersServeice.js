const db = require('./db');

async function postMember(body) {
   await db.query(`insert into dogether.members values(
        default,
        ${JSON.stringify(body.phone)},
        ${body.group_id},
        0,0)`);

}

async function deleteMember(memberPhone){ 
    const data = await db.query(`delete from dogether.members m 
    where m.phone = ${JSON.stringify(memberPhone)}
    `);
    return data;
}

module.exports = {
    postMember,
    deleteMember
}