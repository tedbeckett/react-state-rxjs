import * as Rx from 'rxjs';
import { filter } from 'rxjs/operators';
import { serverMessage$ } from './serverMessage$';

/**
 * Contains an array of System objects
 */
export const systems$ = new Rx.BehaviorSubject([]);

serverMessage$
    .pipe(filter(fsa => fsa.type === 'SET_SYSTEMS'))
    .subscribe(fsa => systems$.next(fsa.payload));
    
