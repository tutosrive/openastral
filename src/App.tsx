import { themeChange } from 'theme-change';
import './App.css';
import { useEffect } from 'react';
import DefaultLayout from './app/layout/default.layout';
import { Route, Routes } from 'react-router';
import routes from './app/routes';

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                {routes.map((route) => {
                    return <Route key={route.endpoint} element={<route.component />} path={route.endpoint} />;
                })}
            </Route>
        </Routes>
    );
}

export default App;
