export const webSocket = new WebSocket('ws://localhost:5000/websocket');

webSocket.addEventListener('open', function (event) {
    console.log('socket open');
});

