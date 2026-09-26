// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const clientQuery = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });
const persistConfig = createAsyncStoragePersister({ storage: window.localStorage });

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <BrowserRouter basename="/" useTransitions={true}>
        <PersistQueryClientProvider client={clientQuery} persistOptions={{ persister: persistConfig }}>
            <App />
        </PersistQueryClientProvider>
    </BrowserRouter>,
    // </StrictMode>,
);
