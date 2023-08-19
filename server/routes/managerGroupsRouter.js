const express = require('express');
const router = express.Router();
const managerGroupsServeice = require('../services/managerGroupsServeice');


router.get('/:phone', async (req, res) => {
    let result = await managerGroupsServeice.getGroups(req.params.phone)
    res.json(result);
})

router.post('/:manager_phone', async (req, res) => {
    let result = await managerGroupsServeice.postGroup(req.params.manager_phone, req.body);
    res.send(result[0])
    
})

module.exports = router;
