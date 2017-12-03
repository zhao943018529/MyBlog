import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

export default function makeRootReducer(asyncReducers){
	return combineReducers({
		routing:routerReducer,
		...asyncReducers
	});
}



export const injectReducers = (...reducers)=>{
	let asyncReducers = {};
	reducers.forEach(reducer=>{
		asyncReducers[reducer.key]=reducer.reducer;
	});

	return makeRootReducer(asyncReducers);
}
