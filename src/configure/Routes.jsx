import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { Flex } from "@chakra-ui/react";
import RenderRouter from "~/configure/renderRouter.jsx";

const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <Flex
                        background="transparent"
                        alignItems="center"
                        justifyContent="center"
                        minH="100vh"
                    >
                        <Atom color="#FEBF32" size="medium" text="" textColor="" />
                    </Flex>
                }
            >
                <RenderRouter />
            </Suspense>
        </BrowserRouter>
    );
};

export default Routes;
