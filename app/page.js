'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const {data:session} = useSession()
  const router = useRouter()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    router.push('/login')
  )
}
