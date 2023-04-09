import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { db } from "@/lib/firebase/baseConfig"

const owner = [
  "0x9c546B5d31D50c5e7EEC48180Dc07cA06ECddBbd", // SUN COMPTE 2 
  "0x9176B620B9db25a1E4aa73b1a6082960a4C40cb9", // BENITO 1
  "0x5B3C26e4116D9ab6B71fb009803f2d3f7E4E63A3", // ADMIN 
];
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
             console.log(siwe.nonce)
            return {
              id: siwe.address,
              token: siwe.nonce
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.isAdmin = owner.includes(user.id);
        }
        return token;
      },
      async session({ session, token }) {
        session.isAdmin = token.isAdmin;
        session.address = token.sub;
        return session;
      },
    },
  });
}
