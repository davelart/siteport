import { Flex } from "@radix-ui/themes"
import IndexHeader from "@/components/index/header"

export default function IndexLayout({ children }: any) {
    return (<>
    <Flex direction={'column'} minHeight={'100dvh'}>
    <IndexHeader />
        {children}
    </Flex>
    </>)
}