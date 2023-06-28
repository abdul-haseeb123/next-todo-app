import '@/app/lib/conn';
import Task from "@/app/models/taskSchema";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/options';
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request) {
    console.log("GET /api/tasks")
    const session = await getServerSession( authOptions)
    console.log(session)
    if (!session) {
        console.log("Not Authorized")
        return NextResponse.json({"message":"Not Authorized"}, {status: 401})
    }
    console.log("Authorized")
    const token = await getToken({req: request, secret: secret})
    console.log("JSON web token ", token)
    session.accessToken = token.accessToken
    const tasks = await Task.find({user: session.user.id})
    console.log(tasks)
    return NextResponse.json(tasks, {status: 200})
}
