import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path:'home',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const HomeView = require('./container/HomeContainer').default;
			const HomeModule = require('../../reducers/HomeReducer');
			let newReducer = injectReducers(store, [{ key: 'home', reducer: HomeModule.default}]);
			let preState = store.getState();
			store.reset(newReducer,{...preState,home:HomeModule.initialState});
			cb(null, HomeView)
		}, 'home')
	}
})