import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    /* @ts-ignore */
    async signIn({ user, account, profile, email, credentials }) {
      const emailWhitelist = [
        "jethro@livr.co",
        "galongau@gmail.com",
        "supergalong@gmail.com",
        "tech@livr.co",
        "leo@livr.co",
        "roberta@livr.co",
        "luke@livr.co",
      ];
      // const isAllowedToSignIn = emailWhitelist.includes(user.email);
      const isAllowedToSignIn = emailWhitelist.includes(user.email);
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return "/unauthorized";
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};

/* @ts-ignore*/
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
