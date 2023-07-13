import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/options";
import { NextResponse } from "next/server";
import "@/app/lib/conn";
import Task from "@/app/models/taskSchema";

export async function PUT(request, {params}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ "message": "Not Authorized" }, { status: 401 });
    }
    const id = params.id;
    const { status } = await request.json();
    try {
        const task = await Task.findById(id);
        if (status) {
            task.status = status;
            await task.save();
            return NextResponse.json(task, { status: 200 });
        }
    } catch (error) {
        console.log("error is", error);
    }
    return NextResponse.json({ "message": "Task not found" }, { status: 404 });
}