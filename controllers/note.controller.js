
'use strict'

const Note = require('../models/note.model')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

module.exports = { index, insert, update, destroy, show }

async function index (req, res, next) {
    try {
        const notes = await Note.find()
        res.status(StatusCodes.OK).send({ notes })
    } catch (error) {
        next(error)
    }
}
async function show (req, res, next) {
    try {
        const note = await Note.findById(req.params.id)
        res.status(StatusCodes.OK).send({ note })
    } catch (error) {
        next(error)
    }
}

async function insert (req, res, next) {
    try {
        const { id, note } = req.body
        if (!id) throw new BadRequestError('Invalid Learning')
        if (!note) throw new BadRequestError('Note field required')
        const learningExists = await Note.exists({ _id: id })
        if (!learningExists) throw new NotFoundError('Learning not found')
        const notes = await Note.create(req.body)
        res.status(StatusCodes.OK).send({ message: 'Created!', notes })
    } catch (error) {
        next(error)
    }
}

async function update (req, res, next) {
    try {
        const notes = await Note.findByIdAndUpdate(req.params.id, req.body)
        res.status(StatusCodes.OK).send({ message: 'Updated!', notes })
    } catch (error) {
        next(error)
    }
}

async function destroy (req, res, next) {
    try {
        const notes = await Note.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).send({ message: 'Deleted!', notes })
    } catch (error) {
        next(error)
    }
}