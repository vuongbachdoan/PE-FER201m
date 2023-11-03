import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { Box } from "@mui/material";

export const AppLayout = () => {
    return (
        <Box>
            <AppNavbar />
            <Box
                marginTop='100px'
            >
                <Outlet />
            </Box>
        </Box>
    );
}