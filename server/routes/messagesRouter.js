const express= require('express');
const router= express.Router();
const messagesService= require('../services/messagesService');


router.get('/:groupId/:phone',async (req,res)=>  { 
    let result = await messagesService.getMessages(req.params.groupId,req.params.phone)
    res.json(result);
})

router.put('/', async (req,res)=>  {
    await messagesService.putMessages(req.body)
    res.send();
})

router.post('/' , async (req,res) =>{ 
    await messagesService.postMessage(req.body);
    res.send();
 })

module.exports =router;