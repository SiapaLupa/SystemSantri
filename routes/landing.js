'use strict'

const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', (req, res, next) => {
    res.send({ message: 'Welcome to System of Santri' })
})
