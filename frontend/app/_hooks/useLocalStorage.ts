import { useState, useEffect, useRef } from "react";

interface config {
    serialize: (value: string) => string;
    deserialize: (value: string) => string;
}

function useLocalStorage<T>(
    key: string,
    initialValue: T,
    config: config = {
        serialize: JSON.parse,
        deserialize: JSON.stringify,
    }
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const { serialize = JSON.parse, deserialize = JSON.stringify } = config;
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const localStorageValue = localStorage.getItem(key);
            if (
                localStorageValue &&
                localStorageValue !== "undefined" &&
                localStorageValue !== "null"
            ) {
                return serialize(localStorageValue);
            }
            return typeof initialValue === "function" ? initialValue() : initialValue;
        }
        return initialValue;
    });
    const prevKeyRef = useRef("");

    useEffect(() => {
        if (prevKeyRef.current !== key) {
            localStorage.removeItem(prevKeyRef.current);
        }
        localStorage.setItem(key, deserialize(value));
        prevKeyRef.current = key;
    }, [value, key, deserialize]);

    return [value, setValue];
}

export default useLocalStorage;