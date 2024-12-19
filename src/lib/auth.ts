import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from "fs";
import path from "path";


const EmailProvider = CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            return null
        }
        // TODO: refactor this code to follow the same methods used in my-events etc pages
        try {
            const csvFilePath = path.join(process.cwd(), "data", "users.csv");

            const csvData = fs.readFileSync(csvFilePath, "utf-8");

            const rows = csvData
                .split("\n")
                .map((row) => row.trim())
                .filter((row) => row.length > 0)
                .map((row) => row.split(","));

            const [headers, ...dataRows] = rows;

            const users = dataRows.map((row) => {
                return headers.reduce((acc, header, index) => {
                    acc[header] = row[index];
                    return acc;
                }, {} as Record<string, string>);
            });

            const user = users.find((user) => user.email === credentials.email);

            if (user) {
                if (user.password !== credentials.password) {
                    return null;
                }

                return { id: user.id, email: credentials.email };
            }

            const highestId = users.reduce((maxId, user) => {
                const currentId = parseInt(user.id);
                return currentId > maxId ? currentId : maxId;
            }, 0);

            const newId = highestId + 1;

            const newUser = {
                id: newId.toString(),
                email: credentials.email,
                password: credentials.password,
            };

            const newUserRow = `${newUser.id},${newUser.email},${newUser.password}\n`;
            fs.appendFileSync(csvFilePath, newUserRow);

            return { id: newUser.id, email: newUser.email };


        } catch (error) {
            console.error("Error reading or processing the CSV file:", error);
            return null;
        }
    }
})

export const authOptions: NextAuthOptions = {
    providers: [
        EmailProvider
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (!user || !account) {
                return false;
            }
            account.id = user.id as string;
            return true;
        },
        async jwt({ token, account }) {
            if (account) {
                token.id = account.id as string;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        }
    }
}