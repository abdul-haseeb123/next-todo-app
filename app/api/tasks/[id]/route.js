import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/options";
import { NextResponse } from "next/server";
import '@/app/lib/conn'
import Task from "@/app/models/taskSchema";

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ "message": "Not Authorized" }, { status: 401 })
    }
    const id = params.id
    console.log("id is", id)
    try {
        const task = await Task.findById(id)
        console.log("task is", task)
        return NextResponse.json(task, { status: 200 })

    } catch (error) {
        console.log("error is", error)
    }
    
    return NextResponse.json({ "message": "Task not found" }, { status: 404 })
}

// create a put requset to update the task
export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ "message": "Not Authorized" }, { status: 401 })
    }
    const id = params.id
    const { content } = await request.json()
    console.log("id is", id)
    console.log("content is", content)
    console.log("completed is", completed)
    try {
        const task = await Task.findById(id)
        task.content = content
        await task.save()
        return NextResponse.json(task, { status: 200 })
    }
    catch (error) {
        console.log("error is", error)
    }
    return NextResponse.json({ "message": "Task not found" }, { status: 404 })
}