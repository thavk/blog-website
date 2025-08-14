import * as React from 'react';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { login } from '../components/auth-handlers.js';
import { Login } from '../api/auth/auth';



export const LoginComponent = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleLogin = async (email: string | undefined, password: string): Promise<Login> => {
        const response = await login(email, password);
        console.log(response);
        return response;
    };


    return (
        <div>
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
            <Button onClick={() => handleLogin(email, password)} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
            <Typography
                endDecorator={<Link href="/login/sign-up">Sign up</Link>}
                sx={{ fontSize: 'sm', alignSelf: 'center' }}
            >
                Don&apos;t have an account?
            </Typography>
        </div>
    );
};
