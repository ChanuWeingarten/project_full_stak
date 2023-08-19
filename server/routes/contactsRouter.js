const express= require('express');
const router= express.Router();
const contactsService= require('../services/contactsService');

router.get('/:groupId',async (req,res)=>  { 
    let result = await contactsService.getContacts(req.params.groupId)
    res.json(result);
})

module.exports =router;