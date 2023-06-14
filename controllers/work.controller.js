"use strict";

const { Work, Account } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { authorize } = require("../utils");

module.exports = { index, insert, update, destroy, show };

/**
 * Get all works from all account, everyone has rights
 * @param {Request} request
 * @param {Response} response
 * @param {VoidFunction} next
 */
async function index(request, response, next) {
  try {
    const works = await Work.find({}, {}, { sort: { createdAt: "desc" } });
    return response.status(StatusCodes.OK).json({ works });
  } catch (error) {
    next(error);
  }
}

/**
 * Show one work from id, everyone has rights
 * @param {Request} request
 * @param {Response} response
 * @param {VoidFunction} next
 */
async function show(request, response, next) {
  try {
    const work = await Work.findOne({ _id: request.params.id });
    return response.status(StatusCodes.OK).json({ work });
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new work, everyone has rights
 * @param {Request} request
 * @param {Response} response
 * @param {VoidFunction} next
 */
async function insert(request, response, next) {
  try {
    request.body.account_id = request.user.id;
    const works = await Work.create(request.body);
    const account = await Account.findById(request.user.id);
    account.work.push(works.id);
    await account.save();
    return response.status(StatusCodes.OK).json({
      message:
        "Congratulations on completing your work successfully! This is a noteworthy accomplishment that highlights your talent and commitment.",
      works,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update the exisiting work, the owner of the work has rights
 * @param {Request} request
 * @param {Response} response
 * @param {VoidFunction} next
 */
async function update(request, response, next) {
  try {
    const { id } = request.params;
    const { user } = request
    const { title, link } = request.body;
    const work = await Work.findById(id);
    authorize(user, work.account_id.toString());
    if (title) work.title = title;
    if (link) work.link = link;
    work.updatedAt = Date.now();
    await work.save();
    return response.status(StatusCodes.OK).json({
      message:
        "Congratulations on finishing your work update! Your dedication to honing and enhancing your work is admirable. ",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a work permanently, the owner of the work has rights
 * @param {Request} request
 * @param {Response} response
 * @param {VoidFunction} next
 */
async function destroy(request, response, next) {
  try {
    const { id } = request.params;
    const { user } = request
    const work = await Work.findById(id);
    authorize(user, work.account_id.toString());
    await work.deleteOne();
    return response.status(StatusCodes.OK).json({
      message:
        "Your writing has been effectively erased. All related information has been permanently deleted, and it has been taken out of our records.",
    });
  } catch (error) {
    next(error);
  }
}
