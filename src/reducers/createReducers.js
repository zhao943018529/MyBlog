import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

export default function makeRootReducer(asyncReducers){
	return combineReducers({
		routing:routerReducer,
		...asyncReducers
	});
}



export const injectReducers = (store, reducers) => {
	if (reducers) {
		reducers.forEach(reducer => {
			store.asyncReducers[reducer.key] = reducer.reducer;
		});
	}

	return makeRootReducer(store.asyncReducers);
}
