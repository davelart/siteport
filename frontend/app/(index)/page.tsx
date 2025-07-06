import IndexClientPage from "./page_client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Logitrac",
    description: "Logitrac is a tool",
}

export default function IndexPage() {
    return (<IndexClientPage />)
}