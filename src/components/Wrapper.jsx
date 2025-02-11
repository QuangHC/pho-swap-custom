import {Container} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function Wrapper({children, maxW = "full", centerContent, py='0', ...props}) {
    return (
        <Container maxW={maxW} centerContent={centerContent} py={py} {...props}>
            {children}
        </Container>
    )
}