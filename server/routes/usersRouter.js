const express = require('express');
const router = express.Router();
const userService = require('../services/userServeice');


router.post('/:phone', async (req, res) => {
    let result = await userService.getUser(req.params.phone, req.body)
    res.json(result);
})

router.post('/', async (req, res) => {
    let result = await userService.postUser(req.body);
    res.json(result);
})

module.exports = router;

