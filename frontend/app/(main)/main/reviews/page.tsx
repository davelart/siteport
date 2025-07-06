import ReviewsClientPage from "./page_client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Reviews',
    description: 'Reviews',
    keywords: ['Logitrac', 'logistics', 'shipping', 'delivery', 'tracking'],
}

export default function ReviewsPage() {
    return (<ReviewsClientPage/>)
}