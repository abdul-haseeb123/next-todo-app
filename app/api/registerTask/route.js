import '@/app/lib/conn'
import User from '@/app/models/userSchema'
import Task from '@/app/models/taskSchema'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/lib/options'
import { getServerSession } from 'next-auth'

export async function POST(request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({"message":"Not Authorized"}, {status: 401})
    }
    // console.log("session is present", session)
    const user = await User.findOne({email: session.user.email})
    // console.log("user is", user)

    const { content } = await request.json()   
    // console.log("content is", content)

    const task = new Task({
        content: content,
        user: user._id
    })
    // console.log("task is", task)

    await task.save()
    // console.log("task saved")

    return NextResponse.json(task, {status: 201})

}