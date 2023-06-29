import '@/app/lib/conn';
import Task from "@/app/models/taskSchema";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/options';
import { NextResponse } from "next/server";



export async function GET(request) {

    const session = await getServerSession( authOptions)

    if (!session) {

        return NextResponse.json({"message":"Not Authorized"}, {status: 401})
    }

    const tasks = await Task.find({user: session.user.id})

    return NextResponse.json(tasks, {status: 200})
}
