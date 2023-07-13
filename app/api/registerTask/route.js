import "@/app/lib/conn";
import User from "@/app/models/userSchema";
import Task from "@/app/models/taskSchema";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/options";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  const { content, dueDate } = await request.json();

  if (!content) {
    return NextResponse.json(
      { message: "No content provided" },
      { status: 400 }
    );
  }

  if (content && !dueDate) {
    const task = new Task({
      content: content,
      user: user._id,
    });
    await task.save();
    return NextResponse.json(task, { status: 201 });
  }

  if (content && dueDate) {
    const task = new Task({
      content: content,
      dueDate: dueDate,
      user: user._id,
    });
    await task.save();
    return NextResponse.json(task, { status: 201 });
  }
}
