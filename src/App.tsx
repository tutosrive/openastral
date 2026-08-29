import { themeChange } from 'theme-change';
import './App.css';
import HomePage from './pages/home.page';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <div className="w-full h-full flex items-center justify-center">
            <HomePage />
        </div>
    );
}

export default App;
