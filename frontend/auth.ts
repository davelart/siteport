import NextAuth from "next-auth"
import {jwtDecode} from "jwt-decode"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(req => {
    return {
        providers: [
                CredentialsProvider({
                    // name to display in the signin page form
                    name: "Credentials",
                    credentials: {
                        username: { label: "Username", type: "text", placeholder: "Username" },
                        password: { label: "Password", type: "password", placeholder: "Password" },
                        rememberme: { label: "Remember Me", type: "checkbox" }
                    },
                    async authorize(credentials) {
                        // credentials is an object containing the username, password, and rememberme
                        // credentials is passed from the signin page form
                        try {
                            const username = credentials?.username
                            const password = credentials?.password
                            const rememberme = credentials?.rememberme

                            const init_response = await fetch(process.env.SERVER_URL + "/api/signin/credentials", { method: "POST", body: JSON.stringify({ "username": username, "password": password }) })
                            const response = await init_response.json()

                            if (init_response.status === 200 && response.success) {
                                response['rememberme'] = rememberme
                                return response
                            } else {
                                return null // return null if the credentials are invalid
                            }
                        } catch (err) {
                            console.log('Credentials signin error', err)
                            return null // return null if there is an error
                        }
                    }
                })
        ],
        secret: process.env.AUTH_SECRET,
        trustHost: true,
        pages: {
            signIn: '/signin',
            signOut: '/signin',
            error: '/signin',
            verifyRequest: '/auth/verify-request',
            // newUser: '/main'
        },
        callbacks: {
            async signIn({ user, account, profile, email, credentials }: any) {
                if (account?.provider === "credentials") {
                return true
                } else {
                console.log('Provider not supported')
                return false
                }
            },
            async jwt({ account, token, user, error }: any) {
                if (account && user) {
                    return {...user}
                } else if (Math.floor(Date.now() / 1000) < token.exp) {
                    return token
                } else if (token?.refresh) {
                    try {
                        const refresh_response = await fetch(process.env.SERVER_URL + "/api/refresh-token", { 
                            method: "POST", 
                            body: JSON.stringify({ "refresh_token": token.refresh })
                        })
                        const refreshedTokens = await refresh_response.json()
                        
                        if (!refresh_response.ok) { throw refreshedTokens }

                        const decoded = jwtDecode(refreshedTokens.access)
                        return {
                            ...token,
                            access: refreshedTokens.access,
                            exp: decoded.exp,
                            refresh: refreshedTokens.refresh ?? token.refresh,
                        }
                    } catch (error) {
                        console.error('Token refresh failed:', error)
                        return { ...token, error: 'Token refresh failed' }
                    }
                } else {
                    console.log('Token expired')
                    return { ...token, error: 'Token expired' }
                }
            },
            async session({ session, token }: any) {
                session = token

                if (token.rememberme == 'true') {
                    session.maxAge = 60 * 60 * 24 * 30 // 30 days if rememberme is true
                } else {
                    session.maxAge = 60 * 60 * 24 // 1 day if rememberme is false
                }

                return session
            },
            async redirect({ url, baseUrl }: any) {
                return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl)
            }
        },
        session: {
            strategy: 'jwt',
            maxAge: 60 * 60 * 24 // 1 day if rememberme is false
        }
    }
})