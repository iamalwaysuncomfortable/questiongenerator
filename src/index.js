import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Toggle from './components/Control';
import * as serviceWorker from './serviceWorker';
//import {BasicForm, EssayForm} from "./components/Forms";

//import web3 from './web3';

ReactDOM.render(
    <App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
