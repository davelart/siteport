import { Metadata } from "next"
import SignInClientPage from "./page_client"

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign In to Logitrac",
}

export default function SignInPage() {
    return (<SignInClientPage />)
}