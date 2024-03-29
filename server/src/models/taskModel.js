// taskModel.js
const { Pool } = require("pg");
const db = require("../db");

const getAllTasks = async () => {
  try {
    const sql = `SELECT * FROM tasks ORDER BY id DESC`;
    const { rows } = await db.query(sql);
    console.log("MODEL_results", rows);

    return rows;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

// Create a new task
const createTask = async (values) => {
  try {
    const sql = `
            INSERT INTO tasks (title, description, due_date, status) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id
        `;
    const result = await db.query(sql, values);
    return result.rows;
  } catch (err) {
    console.error("Error creating tasks:", err);
    throw err;
  }
};

const getTaskById = async (values) => {
  try {
    const sql = `SELECT * FROM tasks WHERE id = $1`;
    const { rows } = await db.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

// Update a task
const updateTask = async (values) => {
  try {
    const sql = `UPDATE tasks SET title = $1, description = $2, due_date= $3, status= $4 WHERE id = $5`;
    const result = await db.query(sql, values);
    return result;
  } catch (err) {
    console.error("Error updating tasks:", err);
    throw err;
  }
};

// Delete a task
const deleteTask = async (values) => {
  try {
    const sql = `DELETE FROM tasks WHERE id = $1`;
    const result = await db.query(sql, values);
    return result;
  } catch (err) {
    console.error("Error deleting tasks:", err);
    throw err;
  }
};

// Update a task status
const updateTaskStatus = async (values) => {
  try {
    const sql = `UPDATE tasks SET status= $1 WHERE id = $2`;
    const result = await db.query(sql, values);
    return result;
  } catch (err) {
    console.error("Error updating status:", err);
    throw err;
  }
};

// Other CRUD functions for tasks (createTask, updateTask, deleteTask) can be implemented similarly

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
