const db = require("../db");
const createError = require("http-errors");
const taskModel = require("../models/taskModel");

exports.getTasks = async (req, res, next) => {
  try {
    const results = await taskModel.getAllTasks();
    console.log("CONTROL_results", results);
    if (Array.isArray(results) && !results.length) {
      return res.status(404).json({
        success: false,
        data: results,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    if (error.status !== 404) {
      next(createError("Cannot get task list!"));
    }
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const values = [id];
    const rows = await taskModel.getTaskById(values);
    if (Array.isArray(rows) && !rows.length) {
      return res.status(404).json({
        success: false,
        data: rows,
      });
    }

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    if (error.status !== 404) {
      next(createError("Cannot get task!"));
    }
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, due_date, status } = req.body;
    const values = [title, description, due_date, status];

    const results = await taskModel.createTask(values);
    console.log("results______", results);
    return res.status(200).json({
      success: true,
      message: `Task added with ID: ${results[0].id}`,
    });
  } catch (error) {
    console.log("error____", error.message);
    next(createError("Cannot create task!"));
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if ((await checkTask(id)) === false) {
      throw createError(404, `There is no task who have id: ${id}`);
    }

    const { title, description, due_date, status } = req.body;

    const values = [title, description, due_date, status, id];
    const { rowCount } = await taskModel.updateTask(values);
    console.log("response___", rowCount);
    if (rowCount) {
      return res.status(200).json({
        success: true,
        message: `Task modified with ID: ${id}`,
      });
    }
  } catch (error) {
    if (error.status !== 404) {
      next(createError("Cannot modify task!"));
    }
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if ((await checkTask(id)) === false) {
      throw createError(404, `There is no task who have id: ${id}`);
    }
    const values = [id];
    const rows = await taskModel.deleteTask(values);
    console.log("rows____", rows);
    return res.status(200).json({
      success: true,
      message: `task deleted with ID: ${id}`,
    });
  } catch (error) {
    if (error.status !== 404) {
      next(createError("Cannot modify user!"));
    }
    next(error);
  }
};

const checkTask = async (id) => {
  const values = [id];
  const rows = await taskModel.getTaskById(values);
  if (Array.isArray(rows) && rows.length) {
    return true;
  }
  return false;
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if ((await checkTask(id)) === false) {
      throw createError(404, `There is no task who have id: ${id}`);
    }

    const { status } = req.body;

    const values = [status, id];
    const { rowCount } = await taskModel.updateTaskStatus(values);
    console.log("response___", rowCount);
    if (rowCount) {
      return res.status(200).json({
        success: true,
        message: `Task Status modified with ID: ${id}`,
      });
    }
  } catch (error) {
    if (error.status !== 404) {
      next(createError("Cannot modify status!"));
    }
    next(error);
  }
};
