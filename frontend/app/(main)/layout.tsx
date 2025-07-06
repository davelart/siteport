import { Flex, Box, Card } from "@radix-ui/themes"
import Side from "@/app/(main)/components/side_bar"
import MainScaffold from "@/app/(main)/components/main_scaffold"

export default function MainLayout({ children }: any) {
    return (<>
    <Box height="100dvh" width="100%" overflow="auto" p={{ initial: '0', lg: '5' }}>
        <Flex flexShrink={'0'} height={'100%'} gap={{ initial: '0', lg: '5' }}>
            <Box flexShrink={'0'} display={{ initial: 'none', lg: 'block' }} height={'100%'} style={{ borderRight: '1px solid var(--gray-a5)' }}>
                <Card size={'1'} style={{ width: '100%', height: '100%', zIndex: 1000, borderRadius: '0 !important' }}>
                    <Side/>
                </Card>
            </Box>
            <Flex flexGrow={'1'} width={'100%'} overflowY={'auto'} height={'100%'}>
                <MainScaffold>
                    {children}
                </MainScaffold>
            </Flex>
        </Flex>
    </Box>
    </>)
}