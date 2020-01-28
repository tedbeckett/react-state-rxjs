import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { receiveServerMessages as startReceivingMessages } from './streams/serverMessage$';

startReceivingMessages();

ReactDOM.render(<App />, document.getElementById('root'));
