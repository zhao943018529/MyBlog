import React from 'react';
import {render} from 'react-dom';
import AppContainer from './container/AppContainer';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import createStore from './store/createStore';
import routes from './routes';

//import bootstrap scss
require('./styles/index.scss');

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store)
const myRoutes = routes(store);

render(<AppContainer store={store} history={history}  routes={myRoutes}/>,
	document.getElementById('root'));