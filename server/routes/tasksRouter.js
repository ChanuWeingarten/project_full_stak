const express= require('express');
const router= express.Router();
const tasksServeice= require('../services/tasksServeice');

router.get('/:id/:phone',async (req,res)=>  { 
    let result = await tasksServeice.getTasks(req.params.id,req.params.phone)
    res.json(result);
})


router.put('/:idTask', async (req,res)=>  {
    let result =  await tasksServeice.putTasks(req.params.idTask,req.body)
    res.json(result);
})

router.post('/:id', async (req,res)=>  {
    await tasksServeice.postTask(req.params.id,req.body)
    res.send();
})

module.exports =router;