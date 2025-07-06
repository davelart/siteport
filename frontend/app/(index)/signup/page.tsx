import SignUpClientPage from "./page_client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign Up to Logitrac",
}

export default function SignUpPage() {
    return (<SignUpClientPage />)
}