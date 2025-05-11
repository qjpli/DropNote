import React from 'react';
import { SessionProvider } from './sessionContext';

interface ProvidersProps {
    children: React.ReactNode;
}

const ContextHandler: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default ContextHandler;
