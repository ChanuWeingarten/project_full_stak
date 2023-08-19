const express = require('express');
const router = express.Router();
const membersService = require('../services/membersServeice');


router.get('/:groupId', async (req, res) => {
    let result = await membersService.getMember(req.params.groupId)
    res.json(result);
})

router.post('/', async (req, res) => {
    await membersService.postMember(req.body);
    res.send();
})

router.delete('/:member', async (req, res) => {
    await membersService.deleteMember(req.params.member);
    res.send();
})

module.exports = router;
