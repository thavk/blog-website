import React, { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page';

function App() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        fetch('http://localhost:5432')
            .then(res => res.text())
            .then(setMessage)
            .catch(() => setMessage('Failed to connect to backend.'));
    }, []);

    return (
        <CssVarsProvider>
            <Sheet style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                <Router>
                    <Routes>
                        <Route path='/' element={<h1>{message}</h1>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                    </Routes>
                </Router>
            </Sheet>
        </CssVarsProvider>
    );
}

export default App;
