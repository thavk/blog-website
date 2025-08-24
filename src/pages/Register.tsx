import * as React from 'react';
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
    const navigate = useNavigate();

    const handleSignUp = async (email: string, username: string, password: string, passwordConfirm: string): Promise<Register> => {
            const response = await register(email, username, password);

            if (response.isError) {
                setError(response.isError);
                setErrorMessage(response.error);
                return response;
            };

            navigate('/login');
            return response;
    };


    return (
        <div style={{
            width: 'min(360px, 90vw)',
            margin: 'auto',
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
