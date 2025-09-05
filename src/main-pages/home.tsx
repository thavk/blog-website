import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Outlet } from "react-router";
import { MultiButton } from '../features/MultiButton';
import { logout } from '../components/auth-handlers.js';
import { useNavigate } from 'react-router-dom';

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
            sx={{ width: 'max-content', marginBottom : '15px' }}
        >
            <Option value="system">System</Option>
            <Option value="light">Light</Option>

            <Option value="dark">Dark</Option>
        </Select>
    );
}


export default function HomePage(props: any) {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const response = await logout();
            console.log(response);
            navigate('/login')
        } catch (error) {
            console.log(error);
        };
        return;
    };

    return (
        <main>
            <CssVarsProvider {...props}>
                <div style={{ position: "relative", width: '100%' }}>
                    <ModeToggle />
                    <div style={{
                        width: 'max-content',
                        marginBottom : '15px',
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}>
                        <MultiButton content="Logout" onClick={() => logoutHandler()} />
                    </div>
                </div>
                <CssBaseline />
                <Sheet
                    sx={{
                        width: 'max-content',
                        maxWidth: '95vw',
                        mx: 'auto',
                        alignSelf: 'center',
                        px: 2,
                        py: 3,
                    }}
                    variant="outlined"
                >
                    <Outlet/>
                </Sheet>
            </CssVarsProvider>
        </main>
    );
}

