import { logout } from '../components/auth-handlers.js';
import React from 'react';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useNavigate } from 'react-router-dom';
import { useColorScheme } from '@mui/joy/styles';

export function LogoutButton() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
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

    // necessary for server-side rendering
    // because mode is undefined on the server

    React.useEffect(() => {
        setMounted(true);

    }, []);


    if (!mounted) {
        return <Button variant="soft">Logout</Button>;
    };

    return (
        <Button
            variant="soft"
            color="neutral"
            sx={{
                width: 'max-content',
                marginBottom : '15px',
                position: "absolute",
                top: 0,
                right: 0,
            }}
            onClick={() => logoutHandler()}
        >
            Logout
        </Button>
    );
}
