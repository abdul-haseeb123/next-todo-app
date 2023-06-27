import React from 'react'
import Image from 'next/image'
import Form from './form'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/options'
import { redirect } from "next/navigation"

async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return (
            <main style={{
                backgroundImage: `url('/images/background.avif')`,
                backgroundSize: 'contain',
            }} className='h-screen grid place-content-center min-w-max'>
                <Form />
            </main>
        )
    }
    redirect('/')
}

export default Page