import React, { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page';
import { LoginComponent } from './features/Login';
import { SignUpComponent } from './features/Register';

function App() {
    const [message, setMessage] = useState('Loading...');

    return (
        <CssVarsProvider>
            <Sheet style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                <Router>
                    <Routes>
                        <Route path='/' element={<h1>{message}</h1>}/>
                        <Route path='/login' element={<LoginPage/>}>
                            <Route index element={<LoginComponent/>}/>
                            <Route path='/login/sign-up' element={<SignUpComponent/>}/>
                        </Route>
                    </Routes>
                </Router>
            </Sheet>
        </CssVarsProvider>
    );
}

export default App;
