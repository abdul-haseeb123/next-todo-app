import React from 'react'
import Image from 'next/image'
import Form from './form'

function Page() {
    return (
        <main style={{
            backgroundImage: `url('/images/background.avif')`,
            backgroundSize: 'contain',
        }} className='h-screen grid place-content-center min-w-max'>
            <Form />
        </main>
    )
}

export default Page