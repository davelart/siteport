import DashboardClientPage from "./page_client"
import { Metadata } from "next"

export const meta: Metadata = {
    title: 'Logitrac | Dashboard',
    description: 'Dashboard',
    keywords: ['Logitrac', 'logistics', 'shipping', 'delivery', 'tracking'],
}

export default function DashboardPage() {
    return (<DashboardClientPage/>)
}