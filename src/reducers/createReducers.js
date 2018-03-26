import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import UserReducer from './UserReducer';

export default function makeRootReducer(asyncReducers) {
	return combineReducers({
		routing: routerReducer,
		user: UserReducer,
		...asyncReducers
	});
}

export const injectReducers = (store, reducers) => {
	store.asyncReducers={};
	if (reducers) {
		reducers.forEach(reducer => {
			store.asyncReducers[reducer.key] = reducer.reducer;
		});
	}

	return makeRootReducer(store.asyncReducers);
}
