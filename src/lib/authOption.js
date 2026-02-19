import { LoginUser } from "@/app/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collection, dbConnect } from "./dbConnect";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log({ user, account, profile, email, credentials });
  //     const isExist = await dbConnect(collection.Users).findOne({
  //       email: user.email,
  //       providerId: account?.provider,
  //     });
  //     if (isExist) {
  //       return true;
  //     }
  //     const newUser = {
  //       providerId: account?.provider || "credentials",
  //       name: user.name,
  //       email: user.email,
  //       image: user.image,
  //       // password: await bcrypt.hash(credentials.password, 14),
  //       role: "user",
  //     };

  //     const result = await dbConnect(collection.Users).insertOne(newUser);
  //     return result.acknowledged;
  //   },
  //   // async redirect({ url, baseUrl }) {
  //   //   return baseUrl;
  //   // },
  //   async session({ session, token, user }) {
  //     if (token) {
  //       if (account.provider === "google") {
  //         const dbUser = await dbConnect(collection.Users).findOne({
  //           email: token.email,
  //         });
  //         session.role = dbUser?.role;
  //         session.email = dbUser?.email;
  //       }
  //       session.role = token?.role;
  //       session.email = token?.email;
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     if (user) {
  //       token.role = user?.role;
  //       token.email = user?.email;
  //     }
  //     return token;
  //   },
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isExist = await dbConnect(collection.Users).findOne({
        email: user.email,
        providerId: account?.provider,
      });

      if (isExist) return true;

      const newUser = {
        providerId: account?.provider || "credentials",
        name: user.name,
        email: user.email,
        image: user.image,
        role: "user",
      };

      const result = await dbConnect(collection.Users).insertOne(newUser);
      return result.acknowledged;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
};
