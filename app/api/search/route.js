import '@/app/lib/conn'
import { NextResponse } from "next/server";
import Task from "@/app/models/taskSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/options";

export async function GET(request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect('http://localhost:3000/login')
    }
    const { searchParams } = new URL(request.url)
    // console.log(searchParams)
    const content = searchParams.get('content')
    // console.log(content)
    const tasks = await Task.find({
        $and:
            [{ content: { $regex: content } },
            { user: session.user.id }]
    })
    // console.log(tasks)
    if (tasks.length === 0) {
        return NextResponse.json({ message: 'No tasks found' }, { status: 404 })
    }
    return NextResponse.json(tasks, {status: 200})
}