/* eslint-disable import/extensions */
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.jsx';
import Title from './components/Title.jsx';

ReactDOM.render(<App />, document.getElementById('reservations'));
ReactDOM.render(<Title />, document.getElementById('title'));
