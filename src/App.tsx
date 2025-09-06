import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './main-pages/home';
import { LoginComponent } from './pages/Login';
import { SignUpComponent } from './pages/Register';
import { HomeComponent } from './pages/Home';
import { BlogComponent } from './pages/Blog';

function App() {

    return (
        <CssVarsProvider>
            <Sheet style={{ padding: '2rem', fontFamily: 'sans-serif', height: '100%' }}>
                <Router>
                    <Routes>
                        <Route path='/' element={<HomePage/>}>
                            <Route index element={<HomeComponent/>}/>
                            <Route path='/login' element={<LoginComponent/>}/>
                            <Route path='/sign-up' element={<SignUpComponent/>}/>
                            <Route path='/blog' element={<BlogComponent/>}/>
                        </Route>
                    </Routes>
                </Router>
            </Sheet>
        </CssVarsProvider>
    );
}

export default App;
