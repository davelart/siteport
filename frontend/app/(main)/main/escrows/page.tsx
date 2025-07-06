import EscrowsClientPage from "./page_client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Escrows',
    description: 'Escrows',
    keywords: ['Logitrac', 'logistics', 'shipping', 'delivery', 'tracking'],
}

export default function EscrowsPage() {
    return (<EscrowsClientPage/>)
}