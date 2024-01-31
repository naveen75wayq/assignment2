import { Request, Response } from 'express'
import { Task } from '../models/task';
import { User } from '../models/user';
import { sendMail } from '../utils/mailSender';

interface ExtendedRequest extends Request {
    user?: any;
}
export async function addTask(req: ExtendedRequest, res: Response) {
    const { title, deadLine, description } = req.body;
    const userId = req.user?.id;
    //console.log(userId)
    const user = await User.find({ _id: userId });
    const newTask = new Task({
        title: title,
        deadLine: new Date(deadLine),
        description: description
    })
    newTask.save()
        // .then(() =>res.status(200))
        .then(() => {
            sendMail(
                user[0].email,
                // email,
                "Task Added",
                title,
                description,
                new Date(deadLine).toLocaleDateString())
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}
export const removeTask = async (req: ExtendedRequest, res: Response) => {
    const { id } = req.body;
    console.log("id: ", id);
    await Task.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}

export const getTask = async(req: ExtendedRequest, res: Response) => {
    await Task.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}