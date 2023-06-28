'use client'


import { useState } from 'react'


import React from 'react'

function Form() {
    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/registerTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="content">Content</label>
            </div>
            <div>
                <input type="text" value={content} onChange={e => setContent(e.target.value)} />
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form