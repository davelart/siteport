import SettingsClientPage from "./page_client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Settings',
    keywords: ['Logitrac', 'logistics', 'shipping', 'delivery', 'tracking'],
}

export default function SettingsPage() {
    return (<SettingsClientPage/>)
}