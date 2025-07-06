'use client'

import { Theme } from "@radix-ui/themes"
import { useConfigStore } from "@/zustand/store"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
    const { appTheme } = useConfigStore()
    const queryClient = new QueryClient()
    return (
        <Theme accentColor={'gray'} appearance={appTheme || 'inherit'} radius={'large'} scaling={'95%'}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer position={'bottom-right'}/>
                {children}
            </QueryClientProvider>
        </Theme>
    )
}