const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    taskName: {
        type: String,
        required: true,
    },
    taskType: {
        type: String,
        required: true,
    },
    taskDeadline: {
        type: String,
        required: false,
    },
});

module.exports = model('Task', taskSchema);