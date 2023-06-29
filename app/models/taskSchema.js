import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ["Completed", "In Progress"],
        default: "In Progress"
    },
    important: {
        type: Boolean,
        default: false,
        required: true
    },
    category: {
        type: String,
        enum: ["Blue", "Green", "Orange", "Purple", "Red"]
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    dueDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


let Task;

try {
    Task = mongoose.model('Task');
} catch {
    Task = mongoose.model('Task', taskSchema);
}

export default Task