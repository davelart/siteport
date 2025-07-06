import { Container, Flex, Heading, Text, Button, TextField, Box, Badge } from "@radix-ui/themes"
import { FiCheckCircle, FiPackage, FiTrendingUp } from "react-icons/fi"
import Image from "next/image"
import bgPattern from "@/public/assets/images/background_03.jpg"

export default function IndexClientPage() {
    return (<>
    <Box>
        {/* Hero Section */}
        <Box minHeight={'80vh'} pt={'5'} style={{ position: 'relative', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 100%), url(${bgPattern.src})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundBlendMode: 'darken' }}>
            {/* <Box style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }} /> */}
            <Container maxWidth={'1320px'} py={'8'} px={'5'} style={{ position: 'relative', zIndex: 1 }}>
                <Flex direction={{ initial: 'column', md: 'row' }} gap={'8'}>
                    <Flex direction={'column'} gap={'4'} width={'100%'}>
                        <Badge size={'2'} style={{ width: 'fit-content', color: 'white', backgroundColor: 'black' }}>
                            <FiTrendingUp color={'white'}/>
                            Trusted by 500+ businesses
                        </Badge>
                        <Heading size={{ initial: '8', md: '9' }} weight={'medium'} style={{ color: 'white' }}>Protecting Every Delivery with Integrity</Heading>
                        <Text size={{ initial: '3', md: '4' }} color={'gray'} mb={'5'} style={{ color: 'white' }}>With our comprehensive solution, you can streamline your logistics processes, enhance efficiency, and ensure seamless deliveries every step of the way.</Text>
                        <Flex direction={{ initial: 'column', md: 'row' }} gap={'4'} flexShrink={'0'}>
                            <TextField.Root size={'3'} placeholder={'Enter Tracking ID'}>
                                <TextField.Slot>
                                    <FiPackage />
                                </TextField.Slot>
                                <Button size={'3'}>Track</Button>
                            </TextField.Root>
                        </Flex>
                        <Flex gap={'2'} align={'center'}>
                            <FiCheckCircle color={'white'}/>
                            <Text size={'1'} color={'gray'} style={{ color: 'white' }}>Real-time tracking available 24/7</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Box>

        {/*  */}
    </Box>
    </>)
}