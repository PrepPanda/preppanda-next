import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/dbconnect";
import User from "@/models/user";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
        };
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || " ",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                await connectDB();
                const sessionUser = await User.findOne({ email: session.user.email });
                session.user = {
                    ...session.user,
                    id: sessionUser?._id.toString(),
                };

                return session;
            } catch (error) {
                console.log(error);
                console.error('Error in session callback:', error);
                return session;
            }
        },

        async signIn({ account, profile, user, credentials }) {
            try {
                await connectDB();
                console.log("Sign in callback called");
                const userExist = await User.findOne({ email: profile?.email });
                if (!userExist) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: profile?.image,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                console.log("error in the signin");
                return false;
            }
        },
    },
});

export default handler;
