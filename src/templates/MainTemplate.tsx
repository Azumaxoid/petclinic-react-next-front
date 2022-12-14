import React from 'react';
import {createTheme, styled} from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import {GlobalNavigation} from "../organisms/GlobalNavigation";

let theme = createTheme({
    palette: {
        primary: {
            main: "#42a5f5",
            light: "#1976d2",
            dark: "#1565c0",
        },
    }})

export const MainTemplate = ({ children }: {
    children: React.ReactNode
}) =>{

    return (
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <GlobalNavigation />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        {children}
                    </Box>
                </Box>
            </ThemeProvider>
        )
}