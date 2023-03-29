import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    secret: "6220ce636ecaf37669d6ce0698912d42885ac66e085d5b94523d1ba23bc0e858",
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'repo'
                }
            }


        }),
        // ...add more providers here
    ],

    // Add the callbacks section
    callbacks: {

        async session({ session, user, token }) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        }

    },

}



export default NextAuth(authOptions)