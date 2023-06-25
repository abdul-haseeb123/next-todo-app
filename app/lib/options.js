import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./database"
import '@/app/lib/conn'
import User from "../models/userSchema"
import { validPassword } from "./passwordUtils"

export const authOptions = {
    adapter:MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const myuser = await User.findOne({email:credentials.email})
                if (myuser) {
                    if (validPassword(credentials.password, myuser.hash, myuser.salt)) {
                        const user = await authOptions.adapter.getUser(user.id)
                        return user
                    }
                    return null
                }
                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access_token;
                token.id = user.id;
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id

            return session
        }
    }
}