import '@/app/lib/conn'
import User from '@/app/models/userSchema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/options'
import { NextResponse } from 'next/server'
import { genPassword } from '@/app/lib/passwordUtils'

export async function POST(request) {
    const session = await getServerSession(authOptions)
    if (session) {
        return NextResponse.json({success:false,"message":"Invalid method for session"}, {status:405})
    }
    const {name, email, password} = await request.body()
    if (name && email && password) {
        const {hash, salt} = genPassword(password)
        const user = new User({
            name:name,
            email:email,
            hash:hash,
            salt:salt
        })
        await user.save()
        return NextResponse.json({success:true, message:"User has been created"}, {status:201})
    }
    return NextResponse.json({success:false, "message":"Unauthorized"}, {status:403})
}