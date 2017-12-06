import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'home',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const HomeView = require('./container/HomeContainer').default;
			const HomeReducer = require('../../reducers/HomeReducer').default;
			let newReducer = injectReducers(store, [{ key: 'home', reducer: HomeReducer}]);
			console.log(nextState);
			store.reset(newReducer);
			cb(null, HomeView)
		}, 'home')
	}
})