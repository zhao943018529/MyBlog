import {applyMiddleware,compose,createStore} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerReducer,routerMiddleware} from 'react-router-redux';
import makeRootReducer from '../reducers/createReducers';
import HomeReducer from '../reducers/HomeReducer';

const RESET='@RESET';

const resetReducerCreator =(reducer,resetState)=>(state,action)=>{
	if(action.type===RESET){
		return resetState;
	}else{
		return reducer(state,action);
	}
}

const resetEnhancer = (createStore)=>(reducer,preloadedState,enhancer)=>{
	const store = createStore(reducer,preloadedState,enhancer);
	const reset = (reducer,resetState)=>{
		let newReducer = resetReducerCreator(reducer,resetState);
		store.replaceReducer(newReducer);
		store.dispatch({type:RESET,state:resetState});
	}

	return {
		...store,
		reset
	};
}


export default (initialState) => {

	let finalCreateStore = compose(applyMiddleware(
		routerMiddleware(browserHistory),
		thunk), resetEnhancer)(createStore);

	let store = finalCreateStore(makeRootReducer({
		home: HomeReducer
	}),initialState);
	store.asyncReducers = {};
	return store;
}



