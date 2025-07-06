import NextAuth from "next-auth"
import { GetServerSessionOptions } from 'next-auth/next'

declare module "next-auth" {
    /**
     * Returned by useSession, getSession and received as a prop on the SessionProvider React Context
     */
    interface Session {
        access_token: string,
        refresh_token: sring,
        identifier: string,
        church: string,
        username: string,
        photograph: string,
        first_name: string,
        last_name: string,
        name: string,
        email: string,
        phone: string,
        confirmed:string,
        user: any,
        profile: {
            identifier:string,
            username:string,
            photograph:string,
            first_name: string,
            last_name: string,
            email: string,
            phone: string,
            confirmed:string,
            user: any,
            is_business_account: string,
            business_identifier: string,
            business: any,
        }
    }

    interface Token {
        access_token: string,
        refresh_token: string,
        username: string,
        photograph: string,
        first_name: string,
        last_name: string,
        name: string,
        email: string,
        phone: string,
        confirmed: string,
        user: any,
        profile: {
            identifier:string,
            username:string,
            photograph:string,
            first_name: string,
            last_name: string,
            email: string,
            phone: string,
            confirmed:string,
            user: any,
            is_business_account: string,
            business_identifier: string,
            business: any,
        }
    }

    type MyGetServerSessionOptions = GetServerSessionOptions & {
        req:any
        // Add any additional properties you need
      }
}