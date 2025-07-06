'use client'

import { Link, TabNav } from "@radix-ui/themes"
import { usePathname } from "next/navigation"

export default function MainNavbar() {
    const pathname = usePathname()
    return (<>
        <TabNav.Root>
            
            <TabNav.Link active={pathname=='/main'}>
                <Link href={'/main'}>Dashboard</Link>
            </TabNav.Link>
            
            <TabNav.Link active={pathname=='/main/profile'}>
                <Link href={'/main/profile'}>Profile</Link>
            </TabNav.Link>
            
            <TabNav.Link active={pathname=='/main/orders'}>
                <Link href={'/main/orders'}>Orders</Link>
            </TabNav.Link>
            
            <TabNav.Link active={pathname=='/main/escrows'}>
                <Link href={'/main/escrows'}>Escrows</Link>
            </TabNav.Link>

            <TabNav.Link active={pathname=='/main/reviews'}>
                <Link href={'/main/reviews'}>Reviews</Link>
            </TabNav.Link>

            <TabNav.Link active={pathname=='/main/settings'}>
                <Link href={'/main/settings'}>Settings</Link>
            </TabNav.Link>

        </TabNav.Root>
    </>)
}