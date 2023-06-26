import React from 'react'
import Form from './form'

function Page() {
  return (
    <main style={{
      backgroundImage: `url('/images/background.avif')`,
      backgroundSize: 'contain',
    }} className='h-screen grid place-content-center'>
      <Form />
    </main>
  )
}

export default Page