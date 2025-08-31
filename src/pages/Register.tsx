import React, { useEffect } from 'react';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { register } from '../components/auth-handlers.js';
import { Register } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';


export const SignUpComponent = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [error, setError] = React.useState(false);
    const [capsLockOn, setCapsLockOn] = React.useState(false);
    const navigate = useNavigate();



    const inputValidation = (user: string, mail: string, pwd: string, confirmPwd: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernamePattern = /^[a-zA-Z0-9_]{5,30}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,60}$/;

        function setErrorMessageReturn(msg: string) {
            setError(true);
            setErrorMessage(msg);
            return false;
        };

        if (!user || !mail || !pwd || !confirmPwd) return setErrorMessageReturn('Missing credentials');
        else if (pwd !== confirmPwd) return setErrorMessageReturn('Passwords do not match');
        else if (!emailRegex.test(mail)) return setErrorMessageReturn('Invalid email');
        else if (!usernamePattern.test(user)) return setErrorMessageReturn('Username must be between 5 and 30 characters. Only letters, numbers and \'_\' are allowed');
        else if (!passwordPattern.test(pwd)) return setErrorMessageReturn('Password must be 8–60 characters long, must contain at least one lowercase letter, one uppercase letter, and one number');

        return true;
    };

    const handleSignUp = async (): Promise<Register | undefined> => {
            const trimmedUser = username.trim();
            const trimmedMail = email.trim();
            const trimmedPwd = password.trim();
            const trimmedConfirmPwd = passwordConfirm.trim();

            const isValid = inputValidation(trimmedUser, trimmedMail, trimmedPwd, trimmedConfirmPwd);

            if (!isValid) {
                return;
            };

            const response = await register(trimmedUser, trimmedMail, trimmedPwd);

            if (response.isError) {
                setError(response.isError);
                setErrorMessage(response.error);
                return;
            };

            navigate('/login');
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
                    <p>{errorMessage}</p>
                </div>
            : null}
            <div style={{ margin : '15px' }}>
                <Typography level="h4" component="h1">
                    <b>Welcome!</b>
                </Typography>
                <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    // html input attribute
                    name="email"
                    type="email"
                    placeholder="johndoe@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    // html input attribute
                    name="username"
                    type="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    // html input attribute
                    name="password"
                    type="password"
                    placeholder="password"
                    value={passwordConfirm}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    onKeyUp={(e) => {
                        setCapsLockOn(e.getModifierState("CapsLock"));
                    }}
                />
                {capsLockOn && <p style={{ color: 'orange', fontSize: '12px', padding: 0, margin: 0 }}>Caps Lock is ON</p>}
            </FormControl>
            <Button onClick={() => handleSignUp()} sx={{ mt: 1 /* margin top */ }}>Sign up</Button>
        </div>
    );
};
