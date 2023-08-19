const express= require('express');
const router= express.Router();
const membergroupsService= require('../services/memberGroupsServeice');


router.get('/:phone',async (req,res)=>  { 
    let result = await membergroupsService.getGroups(req.params.phone)
    res.json(result);
})

module.exports =router;