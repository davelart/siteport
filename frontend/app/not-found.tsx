import { Flex, Heading, Text, Button } from "@radix-ui/themes"
import Link from "next/link"

export default async function Page404() {
    return (
        <>
            <Flex align={'center'} direction={'column'} width={'100%'} height={'100%'} minHeight={'600px'} justify={'center'} py={'8'} px={'5'}>
                <Heading size={'7'} color={'gray'}>#404</Heading>
                <Text size={'3'} mb={'5'} color={'gray'}>Unfortunately, there is no such page.</Text>
                <Link href={'/'}><Button color={'green'} size={'3'}>Back Home</Button></Link>
            </Flex>
        </>
    )
}