import * as Rx from 'rxjs';
import { ships$ } from './ships$';
import { systems$ } from './systems$.js';


/**
 * Creates a stream containing the Systems in the specified Ship.
 */
export function getShipSystems$(shipId) {
    if (!shipId && shipId != 0) return new Rx.BehaviorSubject([]);

    // Gets the systems for the specified ship.
    function getShipSystems(ships, systems) {
        const shipSystemIds = ships
            .filter(ship => ship.shipId == shipId)
            .flatMap(ship => ship.systemIds);
        return systems.filter(system => shipSystemIds.includes(system.systemId));
    };

    const shipSystems = getShipSystems(ships$.value, systems$.value);
    const shipSystems$ = new Rx.BehaviorSubject(shipSystems);

    // Calculate and publish when there is a change to ships or systems.
    Rx.combineLatest(ships$, systems$).subscribe(([ships, systems]) => {
        const shipSystems = getShipSystems(ships, systems);
        shipSystems$.next(shipSystems);
    });

    return shipSystems$;
}
