'use client'

import { Box, Container, Card, Flex, Button, Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
import NavMenu from "./navigation_menu"
import { useRouter, usePathname } from "next/navigation"
// import ProfileMenu from "@/components/main/profile_menu"

export default function IndexHeader() {
    const router = useRouter()
    const pathname = usePathname()
    return (<>
        <Box style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50, backgroundColor: 'transparent', backdropFilter: 'blur(5px)' }}>
            <Container maxWidth={'1320px'} py={'3'} px={'5'}>
                <Card size={'2'} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <Flex width={'100%'} align={'center'} justify={'between'}>
                        <Flex flexShrink={'0'} align={'center'}>
                            <Link href={'/'} style={{ textDecoration: 'none' }}><Text size={'6'} weight={'medium'} style={{ color: 'black' }}>SitePort</Text></Link>
                        </Flex>
                        <Flex flexGrow={'1'} gap={'5'} justify={'center'} display={{ initial: 'none', lg: 'flex' }}>
                            {!pathname.startsWith('/main') && <NavMenu />}
                        </Flex>
                        <Flex flexShrink={'0'} gap={'3'}>
                            <Flex gap={'3'} display={{ initial: 'none' }}>
                                <Button style={{ color: 'black' }} size={'2'} variant={'outline'}>Sign Out</Button>
                            </Flex>
                            <Flex gap={'3'} flexGrow={'1'} display={{ initial: 'none', lg: 'flex' }} justify={'center'}>
                                <Button size={'2'} variant={'surface'} style={{ backgroundColor: 'white' }} onClick={() => {router.push('/signin')}}>Sign In</Button>
                                <Button variant={'solid'} style={{ backgroundColor: 'black' }} size={'2'} onClick={() => {router.push('/signup')}}>Sign Up</Button>
                                {/* <ProfileMenu /> */}
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Container>
        </Box>
    </>)
}