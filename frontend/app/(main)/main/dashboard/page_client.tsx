'use client'

import { Card, Flex, Grid, Text, Button } from "@radix-ui/themes"
import { useConfigStore } from "@/zustand/store"
import { useEffect } from "react"
import { Row, Col } from "@/components/shared/gui"

export default function DashboardClientPage() {
    const { setPageTitle } = useConfigStore()

    useEffect(() => {
        setPageTitle('Dashboard')
    }, [])
    return (<>
        <Row columns={'12'} gap={{ initial: '4', lg: '3' }} width={'100%'}>
            {[1,2,3,4,5,6].map((item) => (
                <Col key={item} span={{ initial: '12', xs: '12', sm: '12', md: '6', lg: '2', xl: '2' }} width={'100%'}>
                    <Card size={'3'} style={{ width: '100%', height: '100%' }}>
                        <Flex direction={'column'}  justify={'center'} gap={'7'}>
                            <Flex >
                                <Text size={'3'} weight={'bold'}>Revenue</Text>
                            </Flex>
                            <Flex direction={'column'} gap={'2'}>
                                <Text size={'7'} weight={'bold'}>$10,349</Text>
                                <Text size={'2'}>For the last 30 days</Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            ))}
        </Row>
    </>)
}