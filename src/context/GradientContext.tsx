import React, { createContext, useState } from "react";

interface Colors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: Colors;
    prevColors: Colors;
    setMainColors: (colors: Colors) => void; 
    setMainPrevColors: (colors: Colors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({ children }: any) => {

    const [colors, setColors] = useState<Colors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const [prevColors, setPrevColors] = useState<Colors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const setMainColors = ( colors: Colors) => {
        setColors( colors );
    }
    const setMainPrevColors = ( colors: Colors) => {
        setPrevColors( colors );
    }

    return (
        <GradientContext.Provider value={{
            colors,
            prevColors,
            setMainColors,
            setMainPrevColors
        }}>
            { children }
        </GradientContext.Provider>
    )
}