const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    userID: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', taskSchema);