const express= require('express');
const router= express.Router();
const groupsService= require('../services/groupsServeice');

router.get('/:grouprId',async (req,res)=>  { 
    let result = await groupsService.getGroup(req.params.grouprId)
    res.json(result);
})

router.delete('/:grouprId',async (req,res)=>  { 
    await groupsService.deleteGroup(req.params.grouprId)
    console.log("7");
    res.send()
})

module.exports =router;