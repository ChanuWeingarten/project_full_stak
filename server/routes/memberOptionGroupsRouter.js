const express= require('express');
const router= express.Router();
const memberoptiongroupsService= require('../services/memberOptionGroupsServeice');


router.get('/:phone',async (req,res)=>  { 
    let result = await memberoptiongroupsService.getGroups(req.params.phone)
    res.json(result);
})

router.put('/',async (req,res)=>  { 
    let result = await memberoptiongroupsService.putGroup(req.body);
    res.json(result);
})

module.exports =router;