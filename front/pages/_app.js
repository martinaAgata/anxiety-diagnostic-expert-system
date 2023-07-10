import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';


export default function MyApp({ Component, pageProps }) {
    const [userMode, setUserMode] = useState('Owner');

    const handleModeChange = (mode) => {
        setUserMode(mode);
        if (typeof window !== 'undefined') {
            console.log(`Changing to ${mode} mode`)
            localStorage.setItem('userMode', mode);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedMode = localStorage.getItem('userMode');
            setUserMode(storedMode ? storedMode : 'Owner');
        }
    }, []);

    return (
        <ChakraProvider>
            <div className="min-h-screen" style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff, #8CA9AD)' }}>
                <div className="content-container">
                    <Component {...pageProps} userMode={userMode} />
                </div>
            </div>
        </ChakraProvider>
    )
}