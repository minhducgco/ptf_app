import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Dimensions } from 'react-native';

export const useKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    function onKeyboardDidShow(e) {
        setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
        setKeyboardHeight(0);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        };
    }, []);
    return [keyboardHeight];
};

export const useScreenWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    return [screenWidth];
};
