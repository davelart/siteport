'use client'

import { Flex, Card, Link, Text, Separator } from "@radix-ui/themes"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { HomeIcon } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Side() {
    const pathname = usePathname()
    return (<>
        <Sidebar style={{ height: '100%', border: 'none', position: 'relative' }}>
            <Flex direction={'column'} width={'100%'} height={'100%'}>
                <Flex direction={'column'} flexGrow={'1'} overflow={'hidden'} width={'100%'}>
                    <Flex direction={'column'} gap={'3'} py={'5'} align={'center'} justify={'center'}>
                        <Card size={'1'} style={{ width: '100%', height: '80%', maxWidth: '80%', maxHeight: '80%', overflow: 'hidden' }}>
                            <Flex direction={'column'} gap={'2'} align={'center'} justify={'center'}>
                                <Text size={'2'}>Logitrac</Text>
                            </Flex>
                        </Card>
                    </Flex>
                    <Flex flexGrow={'1'} overflow={'auto'}>
                        <Menu rootStyles={{ backgroundColor: 'transparent', width: '100%' }}
                            menuItemStyles={{
                                button: ({level, active}) => {
                                    if (active) {
                                        return {
                                            backgroundColor: 'teal', color: '', fontWeight: 'bold', borderRadius: 10, ":hover": { backgroundColor: '#0080803b'}
                                        }
                                    } else if (level === 0) {
                                        return {
                                            borderRadius: 10, "&:hover": { backgroundColor: '#00808026'}
                                        }
                                    } else if (level === 1) {
                                        return {
                                            borderRadius: 10, backgroundColor: 'transparent', "&:hover": { backgroundColor: '#0080801a'}
                                        }
                                    } else if (level === 2) {
                                        return {
                                            borderRadius: 10, backgroundColor: 'transparent', 'hover': { backgroundColor: '#0080801a'}
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/dashboard')} component={<Link href={'/main/dashboard'}/>}>Overview</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/orders')} component={<Link href={'/main/orders'}/>}>Orders</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/escrows')} component={<Link href={'/main/escrows'}/>}>Escrows</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/reviews')} component={<Link href={'/main/reviews'}/>}>Reviews</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/settings')} component={<Link href={'/main/settings'}/>}>Settings</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/invoices')} component={<Link href={'/main/invoices'}/>}>Invoices</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/automations')} component={<Link href={'/main/automations'}/>}>Automations</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/analytics')} component={<Link href={'/main/analytics'}/>}>Analytics</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/reports')} component={<Link href={'/main/reports'}/>}>Reporting</MenuItem>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/messages')} component={<Link href={'/main/messages'}/>}>Messages</MenuItem>
                            <Flex direction={'column'} mt={'5'} gap={'2'} align={'start'}> 
                                <Separator style={{ width: '100%' }}/>
                                <Text size={'3'}>Support</Text>
                            </Flex>
                            <MenuItem icon={<HomeIcon />} active={pathname.startsWith('/main/settings')} component={<Link href={'/main/settings'}/>}>Settings</MenuItem>
                        </Menu>
                    </Flex>

                </Flex>
            </Flex>
        </Sidebar>
    </>)
}