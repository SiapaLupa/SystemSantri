
'use strict'

const express = require('express')
const router = express.Router()

const { AccountController } = require('../../../controllers')
const passport = require('passport')
const upload = require('../../../config/multer')('account')
const middleware = require('../../../middlewares')
const { ADMIN } = require('../../../traits/role')

router.use(upload.single('avatar'))

// All this route will work for authenticated user only
router.use(passport.authenticate('jwt', { session: false }))

// Get information about my account
router.get('/me', AccountController.profile)

// Get All Accounts
router.get('/', AccountController.index)

// Show one account
router.get('/:id', AccountController.show)

// Get all works about an account
router.get('/:id/work', AccountController.workIndex)

// Get a work about an account
router.get('/:id/work/:workId', AccountController.workShow)

// Get a resume of an account
router.get('/:id/resume', AccountController.resume)

// Create an account to the database
router.post('/', middleware.accountIs(ADMIN), AccountController.insert)

// Show one account
router.put('/:id', AccountController.update)

// Delete one account not permanently
router.delete('/:id', AccountController.destroy)

module.exports = router