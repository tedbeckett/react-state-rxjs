const createSystem = require('./createSystem');
const createShip = require('./createShip');
const createStrikeGroup = require('./createStrikeGroup');
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 5000 });

let strikeGroups = [];
let ships = [];
let systems = [];
let sgCount = 1;
let shipCount = 1;
let sysCount = 1;

console.log('server running');

wss.on('open', function open() {
    console.log('Websocket open.');
});

wss.on('connection', async function connection(ws) {
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    sendStrikeGroups(10, ws);
    // await sendUpdates(ws);

    new Promise((resolve, reject) => {

    }).then(() => {

    })

});

async function sendStrikeGroups(count, ws) {
    for (let i = 0; i < count; i++) {
        addStrikeGroup();
        await send('SET_SYSTEMS', systems, ws);
        await send('SET_SHIPS', ships, ws);
        await send('SET_STRIKE_GROUPS', strikeGroups, ws);
    }
}

function addStrikeGroup() {
    const sgId = sgCount++;
    const shipIds = addShips(3, sgId).map(ship => ship.shipId);
    const newStrikeGroup = createStrikeGroup(sgId, `StrikeGroup-${sgId}`, shipIds);
    strikeGroups.push(newStrikeGroup);
}

function addShips(count, sgId) {
    let newShips = [];
    for (let i = 0; i < count; i++) {
        const shipId = shipCount++;
        const systemIds = addSystems(3, sgId, shipId).map(sys => sys.systemId);
        const ship = createShip(shipId, `ship-${sgId}-${shipId}`, systemIds);
        newShips.push(ship);
    }
    ships.push(...newShips);
    return newShips;
}

function addSystems(count, sgId, shipId) {
    let newSystems = [];
    for (let i = 0; i < count; i++) {
        const system = createSystem(sysCount, `sys-${sgId}-${shipId}-${sysCount++}`);
        newSystems.push(system);
    }
    systems.push(...newSystems);
    return newSystems;
}

async function send(type, payload, ws) {
    // For client object shape, follow the Flux standard action convention.
    const messageObject = {
        type,
        payload
    }
    const message = JSON.stringify(messageObject);
    ws.send(message);
    // Use a promise to make the outer function behave as if the send is synchronous
    // (the websocket send is asynchronous).
    return new Promise((resolve) => setTimeout(resolve, 1000));
}


