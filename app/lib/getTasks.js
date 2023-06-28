import './conn'
import Task from "@/app/models/taskSchema";
import User from '../models/userSchema';


const getTasks = async (email) => {
    const user = await User.findOne({ email: email })
    const tasks = await Task.find({ user: user._id })
    return tasks
}

export default getTasks;