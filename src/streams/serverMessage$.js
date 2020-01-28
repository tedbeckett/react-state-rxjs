import * as Rx from 'rxjs';
import { webSocket } from '../server/webSocket';

/**
 * Stream of Flux Standard Action objects sent by the server.
 * FSA object structure is {type: 'typeName', payload: {}}.
 * See https://github.com/redux-utilities/flux-standard-action
 */
export const serverMessage$ = new Rx.BehaviorSubject({ type: 'UNKNOWN', payload: {} });

/**
 * Starts the flow of messages from the server to the message stream.
 * The server sends a websocket message which by convention with our
 * server contains a Flux Standard Action object.
 */
export function receiveServerMessages() {
    webSocket.addEventListener('message', function (msg) {
        // msg.data is a Flux Standard Action object as json
        // {type: 'name', payload: {}}
        const fsa = JSON.parse(msg.data);
        if (isValid(fsa)) {
            serverMessage$.next(fsa);
        } else {
            console.log(`Invalid message from server: ${JSON.stringify(fsa, null, 2)}`);
        }
    });
}

/**
 * Checks if object is a valid Flux Standard Action object.
 */
function isValid(fsaObject) {
    return typeof fsaObject.type === 'string'
        && typeof fsaObject.payload === 'object'
        && fsaObject.data !== null;
}
