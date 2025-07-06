import OrdersClientPage from "./page_client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Orders',
    description: 'Orders',
    keywords: ['Logitrac', 'logistics', 'shipping', 'delivery', 'tracking'],
}

export default function OrdersPage() {
    return (<OrdersClientPage/>)
}