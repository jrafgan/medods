import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from "./Store/ConfigureStore";
import App from './App';


import './index.css';

const app = (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
