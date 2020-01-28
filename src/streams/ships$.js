import * as Rx from 'rxjs';
import { filter, pluck } from 'rxjs/operators';
import { serverMessage$ } from './serverMessage$';

/**
 * Contains an array of normalized Ships objects (has array of system-ids, not systems).
 */
export const ships$ = new Rx.BehaviorSubject([]);

serverMessage$
    .pipe(
        filter(fsa => fsa.type === 'SET_SHIPS'),
        pluck('payload'))
    .subscribe(ships$.next.bind(ships$));
