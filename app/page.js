"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@material-tailwind/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else if (status === "loading") {
    return (
      <div className="flex justify-center">
        <Spinner color="blue" className="w-8 h-8" />
      </div>
    );
  }

  return (
    <>
      <div>not signed in</div>
      <Link href="/login">Login</Link>
    </>
  );
}
