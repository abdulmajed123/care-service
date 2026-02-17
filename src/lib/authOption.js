// import { LoginUser } from "@/app/action/server/auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         // username: { label: "Username", type: "text", placeholder: "jsmith" },
//         // password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const user = await LoginUser(credentials);
//         if (user) {
//           return {
//             _id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//           };
//         }
//         return null;
//       },
//     }),
//     // ...add more providers here
//   ],
// };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUser } from "@/app/action/server/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await LoginUser(credentials);
        if (user) {
          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "database", // cookie-based session
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
