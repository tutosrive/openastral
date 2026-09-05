import { themeChange } from 'theme-change';
import { useEffect } from 'react';
import DefaultLayout from './app/layout/default.layout';
import { Route, Routes } from 'react-router';
import routes from './app/routes';
import { useWindowTitle } from './app/stores/app.store';
import './App.css';

function App() {
    const titleState = useWindowTitle();

    useEffect(() => {
        themeChange(false);
    }, []);

    useEffect(() => {
        document.title = titleState.title;
    }, [titleState.title]);

    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                {routes.map((route) => {
                    return <Route key={route.id} element={<route.component key={`${route.endpoint}`} />} path={route.endpoint} />;
                })}
            </Route>
        </Routes>
    );
}

export default App;
