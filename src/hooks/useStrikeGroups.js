import { strikeGroups$ } from '../streams/streams';
import { useState, useEffect } from 'react';

export function useStrikeGroups() {
    const [strikeGroups, setStrikeGroups] = useState(strikeGroups$.value);

    useEffect(() => {
        const subscription = strikeGroups$.subscribe(setStrikeGroups);
        return () => subscription.unsubscribe();
    }, []);

    return strikeGroups;
}