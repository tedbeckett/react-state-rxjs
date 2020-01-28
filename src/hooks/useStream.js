import { useState, useEffect } from 'react';

export function useStream(stream$, initValue = []) {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        const subscription = stream$.subscribe(setValue);
        return () => subscription.unsubscribe();
    }, [stream$]);

    return value;
}