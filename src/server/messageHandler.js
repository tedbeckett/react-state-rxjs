
const messageHandlers = new Map();

export function messageHandler(msg) {
    if (!(msg && msg.type && msg.payload)) {
        console.log(`Invalid msg received from server: ${msg}`);
        return;
    }
    const handler = messageHandlers.get(msg.type);
    if (!handler) {
        console.log(`Msg type ${msg.type} not supported`);
        return;
    }
    handler(msg.payload);
};

messageHandlers.put('SET_STRIKE_GROUPS', (payload) => strikeGroups$.next(payload));

messageHandlers.put('SET_SHIPS', (payload) => ships$.next(payload));

messageHandlers.put('SET_SYSTEMS', (payload) => systems$.next(payload));

