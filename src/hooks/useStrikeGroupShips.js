import { useState, useEffect } from 'react';
import { getStrikeGroupShips$ } from '../streams/getStrikeGroupShips$';

export function useStrikeGroupShips(sgId) {

    const [sgShips, setSgShips] = useState([]);

    useEffect(() => {
        const sgShips$ = getStrikeGroupShips$(sgId);
        const subscription = sgShips$.subscribe(setSgShips);
        return () => {
            subscription.unsubscribe();
            sgShips$.complete();
        }
    }, [sgId]);

    return sgShips;
}