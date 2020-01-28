import { useState, useEffect } from 'react';
import { getSgShips$ } from '../streams/getSgShips$';

export function useStrikeGroupShips(sgId) {

    const [sgShips, setSgShips] = useState([]);

    useEffect(() => {
        const sgShips$ = getSgShips$(sgId);
        const subscription = sgShips$.subscribe(setSgShips);
        return () => {
            subscription.unsubscribe();
            sgShips$.complete();
        }
    }, [sgId]);

    return sgShips;
}