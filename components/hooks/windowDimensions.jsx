import { useState, useEffect } from 'react';

const WindowDimensions = () => {
    const hasWindow = typeof window !== 'undefined';

    const getWindowDimensions = () => {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {


            const handleResize = () => {
                if (hasWindow) {
                    setWindowDimensions(getWindowDimensions());
                    window.addEventListener('resize', handleResize);
                    return () => window.removeEventListener('resize', handleResize);
                }
            }
    });

    return windowDimensions;
}


export default WindowDimensions;
