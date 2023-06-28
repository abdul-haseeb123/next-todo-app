import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../lib/options";

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (session) {
        // return NextResponse.json({"message": "You are logged in."})
        return new Response(JSON.stringify(session), {
            headers: {
                "content-type": "application/json",
            },
        });
    }
    // return NextResponse.json({"message": "You are not logged in."})
    return new Response(JSON.stringify({"message":"You are not logged in"}), {
        headers: {
            "content-type": "application/json",
        },
    });
}