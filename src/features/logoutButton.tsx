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
            sx={{ width: 'max-content', marginBottom : '15px', left: '93%' }}
        >
            Logout
        </Button>
    );
}
