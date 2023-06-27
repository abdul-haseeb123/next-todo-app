import React from 'react'
import { Spinner } from "@/components/materialTailwind"

function Loading() {
  return (
    <div className='flex justify-center'>
      <Spinner color='blue' className='h-8 w-8' />
    </div>
  )
}

export default Loading