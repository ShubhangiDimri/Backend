const express = require('express');
const router = express.Router();
const taskModel = require('../models/task.model');

// Nested routes for tasks
// GET /tasks
router.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        
        const tasks = await taskModel.find({}).skip(skip).limit(limit);
        const totalTasks = await taskModel.countDocuments();
        const totalPages = Math.ceil(totalTasks/limit);

        res.json({
            total: totalTasks,
            totalPages: totalPages,
            currentPage: page,
            limit: limit,
            data: tasks
        });
    } catch (err) {
        next(err);  // Pass error to error handling middleware
    }
});

// GET /tasks/completed - Get all completed tasks
router.get('/completed', async (req, res, next) => {
    try {
        const tasks = await taskModel.find({ isCompleted: true });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// GET /tasks/pending - Get all pending tasks
router.get('/pending', async (req, res, next) => {
    try {
        const tasks = await taskModel.find({ isCompleted: false });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// POST /tasks
router.post('/', async (req, res, next) => {
    try {
        if (!req.body.name) {
            const error = new Error('Task name is required');
            error.status = 400;
            throw error;
        }
        
        const newTask = await taskModel.create({ name: req.body.name });
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
});

// PUT /tasks/:id
router.put('/:id', async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const updateData = {};
        
        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.isCompleted !== undefined) {
            updateData.isCompleted = req.body.isCompleted;
            updateData.completedAt = req.body.isCompleted ? new Date() : null;
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        );

        if (!updatedTask) {
            const error = new Error('Task not found');
            error.status = 404;
            throw error;
        }

        res.json(updatedTask);
    } catch (err) {
        next(err);
    }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            const error = new Error('Task not found');
            error.status = 404;
            throw error;
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;