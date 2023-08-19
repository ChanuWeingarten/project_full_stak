const express= require('express');
const router= express.Router();
const sendmailService= require('../services/sendmailService');


router.get('/',async (req,res)=>  { 
    await sendmailService.getTasks(req.body)
    res.send();
})



module.exports =router;