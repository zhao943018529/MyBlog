import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path:'home',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const HomeView = require('./container/HomeContainer').default;
			const HomeModule = require('../../reducers/HomeReducer');
			const ArticleModule = require('../../reducers/ArticleReducer');
			let newReducer = injectReducers(store, [{ key: 'home', reducer: HomeModule.default},{key:'articles',reducer:ArticleModule.default}]);
			let preState = store.getState();
			store.reset(newReducer,preState);
			cb(null, HomeView)
		}, 'home')
	}
})