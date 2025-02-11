import Header from "~/layout/Header.jsx";
import {Flex} from "@chakra-ui/react";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default DefaultLayout;