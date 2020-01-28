import * as Rx from 'rxjs';
import { filter, pluck } from 'rxjs/operators';
import { serverMessage$ } from './serverMessage$';

/**
 * Contains an array of normalized StrikeGroup objects (has array of ship ids, not ships).
 */
export const strikeGroups$ = new Rx.BehaviorSubject([]);

serverMessage$
    .pipe(
        filter(fsa => fsa.type === 'SET_STRIKE_GROUPS'),
        pluck('payload'))
    .subscribe(strikeGroups$.next.bind(strikeGroups$));




