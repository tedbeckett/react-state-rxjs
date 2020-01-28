import { useState, useEffect } from 'react';
import { getShipSystems$ } from '../streams/getShipSystems$';

export function useShipSystems(shipId) {

    const [shipSystems, setShipSystems] = useState([]);

    useEffect(() => {
        const shipSystems$ = getShipSystems$(shipId);
        const subscription = shipSystems$.subscribe(setShipSystems);
        return (() => {
            subscription.unsubscribe();
            shipSystems$.complete();
        });
    }, [shipId]);

    return shipSystems;
}