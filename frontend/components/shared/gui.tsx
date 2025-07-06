import { Box, Card, Grid } from "@radix-ui/themes"

const GUI = () => {
    return (<></>)
}
export default GUI

export const SBox = (props: any) => {
    return (
        <Card size={'4'} {...props}>
            {props.children}
        </Card>
    )
}

export const Row = ({columns='12', children, ...rest}: any) => {
    return (
        <Grid columns={columns} {...rest}>
            {children}
        </Grid>
    )
}

export const Col = ({ span, children, ...rest }: any) => {
    const classNames = [];

    // Default to full width if no span is provided, otherwise generate classes
    if (!span) {
        classNames.push('col-span-12')
    } else {
        if (span.initial) classNames.push(`col-span-${span.initial}`)
        if (span.xs) classNames.push(`col-span-xs-${span.xs}`)
        if (span.sm) classNames.push(`col-span-sm-${span.sm}`)
        if (span.md) classNames.push(`col-span-md-${span.md}`)
        if (span.lg) classNames.push(`col-span-lg-${span.lg}`)
        if (span.xl) classNames.push(`col-span-xl-${span.xl}`)
    }

    // Combine with any existing className passed in props
    const finalClassName = [rest.className, ...classNames].filter(Boolean).join(' ')

    return (
        <Box {...rest} className={finalClassName}>
            {children}
        </Box>
    );
}