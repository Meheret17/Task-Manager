const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth'); 
const Task = require('../models/tasks'); 

// Create a new task
router.post('/tasks', authenticate, async(req, res) => {
    try{
        console.log('request body', req.body);
        console.log('req.user', req.user);
        const {name, description, status} = req.body;
        
        if(!name){
            return res.status(400).json({error: 'Title is required'});
        }
        if (!req.user || !req.user.userID) {
            return res.status(401).json({error: 'Unauthorized access'});
        }
        if(status && !['pending', 'in-progress', 'completed'].includes(status)){
            return res.status(400).json({error: 'Invalid status'});
        }
        const task = new Task({
            name,
            description,
            status: status || 'pending', // default to 'pending' if not provided
            userID: req.user.userID
        })
        await task.save();
        res.status(201).json({
            message: 'Task created successfully',
            task: {
                id: task._id,
                name: task.name,
                description: task.description,
                status: task.status,
                createdAt: task.createdAt
            }
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

//get all tasks
router.get('/tasks', authenticate, async(req, res)=>{
    try{
        const {page=1, limit=10, search=''} = req.query;
        const query = {
            userID: req.user.userID,
            name: { $regex: search, $options: 'i' } // case-insensitive search
        };
        const pageNum = parseInt(page, 10)
        const limitNum = parseInt(limit, 10)

        if(pageNum < 1 || limitNum < 1){
            return res.status(400).json({error: 'Invalid page or limit'});
        }
        const tasks = await Task.find(query)
            .select('name status createdAt')
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .sort({createdAt: -1});
        
        const total = await Task.countDocuments(query)
        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

//update task status
router.patch('/tasks/:id', authenticate, async(req, res)=>{
    try{
        const {status} = req.body
        const {id} = req.params

        if(!['pending', 'in-progress', 'completed'].includes(status)){
            return res.status(400).json({error: 'Invalid status'});
        }
        const task = await Task.findOneAndUpdate(
            {_id: id, userID: req.user.userID},
            {status},
            {new: true, runValidators: true})

        if(!task){
            return res.status(404).json({error: 'Task not found'});
        }
        res.status(200).json({
            message: 'Task updated successfully',
            task: {
                id: task._id,
                name: task.name,
                description: task.description,
                status: task.status,
                createdAt: task.createdAt
            }
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

//delete task
router.delete('/tasks/:id', authenticate, async(req, res)=>{
    try{
        const {id} = req.params
        const task = await Task.findOneAndDelete({_id: id, userID: req.user.userId})

        if(!task){
            return res.status(404).json({error: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;

