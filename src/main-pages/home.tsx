import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Outlet } from "react-router";


function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    // necessary for server-side rendering
    // because mode is undefined on the server

    React.useEffect(() => {
        setMounted(true);

    }, []);


    if (!mounted) {
        return <Button variant="soft">Change mode</Button>;
    };

    return (
        <Select
            variant="soft"
            value={mode}
            onChange={(event, newMode) => {
                setMode(newMode);

            }}
            sx={{ width: 'max-content' }}
        >
            <Option value="system">System</Option>
            <Option value="light">Light</Option>

            <Option value="dark">Dark</Option>
        </Select>
    );
}


export default function HomePage(props: any) {
    return (
        <main>
            <CssVarsProvider {...props}>
                <ModeToggle />
                <CssBaseline />
                <Sheet
                    sx={{
                        width: 'fit-content',
                        maxWidth: '95%',
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & bottom
                        py: 3, // padding top & bottom
                        px: 1, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        fitContent: 'fit-content',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Outlet/>
                    </div>
                </Sheet>
            </CssVarsProvider>
        </main>
    );
}

