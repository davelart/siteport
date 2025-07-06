'use client'

import { Flex, Text } from "@radix-ui/themes"
import { useConfigStore } from "@/zustand/store"

export default function MainScaffold({ children }: any) {
    const { pageTitle } = useConfigStore()
    return (<>
        <Flex direction={'column'} flexGrow={'1'} width={'100%'} overflow={'auto'} gap={{ initial: '0', lg: '2' }}>
            <Flex justify={'between'} mb={'3'} p={{ initial: '3', lg: '0' }} gap={'3'} display={'flex'} width={'100%'} wrap={'wrap'} align={'center'}>
                <Flex direction={'column'} flexGrow={'1'} justify={'start'} ml={{ initial: '0', lg: '5' }}>
                    <Text weight={'medium'} highContrast size={'5'}>{`${pageTitle}`}</Text>
                    <Text color={'gray'} size={'2'}>Meet your own numbers regarding all operations</Text>
                </Flex>
                <Flex justify={'end'} mr={{ initial: '0', lg: '5' }}>
                </Flex>
            </Flex>
            <Flex flexGrow={'1'} direction={'column'} width={'100%'} height={'100%'} overflowY={'auto'} p={{initial:'3', lg:'0'}} pb={{ initial: '80px', xl: '0' }} overflow={'auto'}>
                {children}
            </Flex>
        </Flex>
    </>)
}