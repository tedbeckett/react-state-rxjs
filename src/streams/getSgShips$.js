import * as Rx from 'rxjs';
import { strikeGroups$ } from './strikeGroups$';
import { ships$ } from './ships$';

/**
 * Creates a stream containing the Ships in the specified Strike Group.
 */
export function getSgShips$(strikeGroupId) {
    if (!strikeGroupId && strikeGroupId != 0) return new Rx.BehaviorSubject([]);

    // Gets the ships for the specified strike group.
    function getStrikeGroupShips(strikeGroups, ships) {
        const strikeGroupShipIds = strikeGroups
            .filter(sg => sg.sgId == strikeGroupId)
            .flatMap(sg => sg.shipIds);
        return ships.filter(ship => strikeGroupShipIds.includes(ship.shipId));
    };

    const sgShips = getStrikeGroupShips(strikeGroups$.value, ships$.value);
    const sgShips$ = new Rx.BehaviorSubject(sgShips);

    // Updates and publishes $sgShips on changes.
    Rx.combineLatest(strikeGroups$, ships$).subscribe(([strikeGroups, ships]) => {
        const sgShips = getStrikeGroupShips(strikeGroups, ships);
        sgShips$.next(sgShips);
    });

    return sgShips$;
}
