const express = require("express");
const app = express();
const port = 8000;
const usersRouter = require('./routes/usersRouter')
const titleRouter = require('./routes/titleRouter')
const managergroupsRouter = require('./routes/managerGroupsRouter')
const membergroupsRouter = require('./routes/memberGroupsRouter')
const memberoptiongroupsRouter = require('./routes/memberOptionGroupsRouter')
const membersRouter = require('./routes/membersRouter')
const groupsRouter = require('./routes/groupsRouter')
const tasksRouter = require('./routes/tasksRouter')
const messagesRouter = require('./routes/messagesRouter')
const contactsRouter = require('./routes/contactsRouter')




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,          
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/api/dogether/users', usersRouter);
app.use('/api/dogether/titles', titleRouter);
app.use('/api/dogether/managergroups', managergroupsRouter);
app.use('/api/dogether/membergroups', membergroupsRouter);
app.use('/api/dogether/memberoptiongroups', memberoptiongroupsRouter);
app.use('/api/dogether/members', membersRouter);
app.use('/api/dogether/groups', groupsRouter);
app.use('/api/dogether/tasks', tasksRouter);
app.use('/api/dogether/messages', messagesRouter);
app.use('/api/dogether/contacts', contactsRouter);



app.listen(port, (req, res) => {
   console.log('starting');
});