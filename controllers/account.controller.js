
'use strict'

const jwt = require('jsonwebtoken')
const fs = require('node:fs')
const path = require('node:path')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const { Account, Resume, Work } = require('../models')
const { EMAIL_PATTERN } = require('../traits')

module.exports = { index, profile, show, update, destroy, trash, restore, eliminate, insert, workIndex, workShow, resume }

async function index (req, res, next) {
    try {
        const withTrashed = req.query.trashed
        const option = { deletedAt: null }
        if (withTrashed) option.deletedAt = { $ne: null }
        const accounts = await Account.find(option, { name: 1, email: 1, avatar: 1, generationYear: 1, generation: 1, division: 1, status: 1 })
        res.status(StatusCodes.OK).send({ accounts })
    } catch (error) {
        next(error)
    }
}

async function insert (req, res, next) {
    try {
        const { email, password, name } = req.body
        if (!email) throw new BadRequestError('Email address is required')
        if (!password) throw new BadRequestError('Password is required')
        if (!name) throw new BadRequestError('Name is required')
        if (!EMAIL_PATTERN.test(email)) throw new BadRequestError('Please insert a valid email address')
        if (req.file) req.body.photo = req.file.filename
        req.body.verify = true
        const account = await Account.create(req.body)
        const { id } = account
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET)
        const showAccount = { id, name, email, password }
        res.status(StatusCodes.OK).send({ token, account: showAccount })
    } catch (error) {
        next(error)
    }
}

async function show (req, res, next) {
    try {
        const { id } = req.params
        const account = await Account.findOne({ _id: id, deletedAt: null })
        res.status(StatusCodes.OK).send({ account })
    } catch (error) {
        next(error)
    }
}

async function update (req, res, next) {
    try {
        const { id } = req.params
        req.body.updatedAt = Date.now()
        const account = await Account.findOneAndUpdate({ _id: id, deletedAt: null }, req.body)
        res.status(StatusCodes.OK).send({ account })
    } catch (error) {
        next(error)
    }
}

async function destroy (req, res, next) {
    try {
        const { id } = req.params
        const account = await Account.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: Date.now() })
        res.status(StatusCodes.OK).send({ account })
    } catch (error) {
        next(error)
    }
}
async function trash (req, res, next) {
    try {
        const accounts = await Account.find({ deletedAt: { $ne: null } })
        res.status(StatusCodes.OK).send({ accounts })
    } catch (error) {
        next(error)
    }
}
async function restore (req, res, next) {
    try {
        const { id } = req.params
        await Account.findByIdAndUpdate(id, { deletedAt: null })
        res.status(StatusCodes.OK).send({ message: 'Account restored' })
    } catch (error) {
        next(error)
    }
}
async function eliminate (req, res, next) {
    try {
        const { id } = req.params
        const account = await Account.findById(id)
        const { photo } = account
        await account.deleteOne()
        if (photo !== 'default-avatar.jpg') { fs.unlink(path.join(__dirname, '..', 'public', 'images', 'account', photo), error => { if (error) throw error }) }
        res.status(StatusCodes.OK).send({ message: 'Account Clear' })
    } catch (error) {
        next(error)
    }
}
async function profile (req, res, next) {
    try {
        const { id } = req.user
        const account = await Account.findById(id)
        res.status(StatusCodes.OK).send({ account })
    } catch (error) {
        next(error)
    }
}

async function workIndex (req, res, next) {
    try {
        const { id } = req.params
        const works = await Work.find({ account_id: id, deletedAt: null })
        res.send({ works })
    } catch (error) {
        next(error)
    }
}

async function workShow (req, res, next) {
    try {
        const { workId, id } = req.params
        const works = await Work.find({ _id: workId, account_id: id, deletedAt: null })
        if (!works) throw new NotFoundError('Work Not Found')
        res.status(StatusCodes.OK).send({ works })
    } catch (error) {
        next(error)
    }
}

async function resume (req, res, next) {
    try {
        const { id } = req.params
        const resume = await Resume.findOne({ account_id: id })
        if (!resume) throw new NotFoundError('Resume Not Found')
        res.status(StatusCodes.OK).send({ resume })
    } catch (error) {
        next(error)
    }
}
