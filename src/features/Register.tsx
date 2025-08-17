import * as React from 'react';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { register } from '../components/auth-handlers.js';
import { Register } from '../api/auth/auth';



export const SignUpComponent = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleSignUp = async (email: string, username: string, password: string, passwordConfirm: string): Promise<Register> => {
            const response = await register(email, username, password);

            if (response.isError) {
                setError(response.isError);
                setErrorMessage(response.error);
                return response;
            };

            return response;
    };


    return (
        <div>
            {error ?
                <div style={{
                    background : 'rgba(255, 0, 0, 0.2)',
                    color : 'rgba(255, 255, 255, 0.9)',
                    padding: '10px',
                    fontSize : '20px',
                    borderRadius : '9px',
                    height : '50px',
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    marginBottom : '15px',
                }}
                >
                    <h3>{errorMessage}</h3>
                </div>
            : null}
            <Typography level="h4" component="h1">
                <b>Welcome!</b>

            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
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
                />
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
                />
            </FormControl>
            <Button onClick={() => handleSignUp(email, username, password, passwordConfirm)} sx={{ mt: 1 /* margin top */ }}>Sign up</Button>
        </div>
    );
};
