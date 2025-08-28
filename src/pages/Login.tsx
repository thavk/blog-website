import * as React from 'react';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { login } from '../components/auth-handlers.js';
import { Login } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';


export const LoginComponent = () => {
    const [password, setPassword] = React.useState('');
    const [userOrEmail, setUserOrEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [error, setError] = React.useState(false);
    const [capsLockOn, setCapsLockOn] = React.useState(false);
    const navigate = useNavigate();

    const inputValidation = (user: string, pwd: string): boolean => {
        const minPassword = 8;
        const maxPassword = 60;
        const maxEmail = 254;

        if (!user ||!pwd) return setErrorMessageReturn('Missing credentials');
        if (pwd.length < minPassword || pwd.length > maxPassword) return setErrorMessageReturn('Password must be between 8 and 60 characters');
        if (user.length > maxEmail) return setErrorMessageReturn('Invalid input');

        return true;

        function setErrorMessageReturn(msg: string) {
            setError(true);
            setErrorMessage(msg);
            return false;
        };
    };

    const handleLogin = async (): Promise<Login | undefined> => {
        const trimmedUser = userOrEmail.trim();
        const trimmedPwd = password.trim();

        const isValid = inputValidation(trimmedUser, trimmedPwd);

        if (!isValid) {
            return;
        };

        const response = await login(trimmedUser, trimmedPwd);

        if (response.isError) {
            setError(response.isError);
            setErrorMessage(response.error);
            return;
        };

        navigate('/');

        return response;
    };


    return (
        <div style={{
            width: 'min(280px, 90vw)',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        }}>
            {error ?
                <div style={{
                    background : 'rgba(255, 0, 0, 0.2)',
                    color : 'rgba(255, 255, 255, 0.9)',
                    padding: '2px',
                    margin: '8px',
                    fontSize : '14px',
                    borderRadius : '9px',
                    height : 'auto',
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    marginBottom : '15px',
                    textAlign : 'center',
                }}
                >
                    <h3>{errorMessage}</h3>
                </div>
            : null}
            <div style={{ margin : '15px' }}>
                <Typography level="h4" component="h1">
                    <b>Welcome!</b>
                </Typography>
                <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
                <FormLabel>Email or Username</FormLabel>
                <Input
                    // html input attribute
                    name="userOrEmail"
                    type="text"
                    placeholder="username"
                    value={userOrEmail}
                    onChange={(event) => setUserOrEmail(event.target.value)}
                />

            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    // html input attribute
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyUp={(e) => {
                        setCapsLockOn(e.getModifierState("CapsLock"));
                    }}
                />
                {capsLockOn && <p style={{ color: 'orange', fontSize: '12px', padding: 0, margin: 0 }}>Caps Lock is ON</p>}
            </FormControl>
            <Button onClick={() => handleLogin()} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
            <Typography
                endDecorator={<Link href="/sign-up">Sign up</Link>}
                sx={{ fontSize: 'sm', alignSelf: 'center' }}
            >
                Don&apos;t have an account?
            </Typography>
        </div>
    );
};
