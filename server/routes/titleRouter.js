const express= require('express');
const router= express.Router();
const titleService= require('../services/titleServeice');

router.get('/',async (req,res)=>  { 
    let result = await titleService.getUser()
    res.json(result);
})

module.exports =router;