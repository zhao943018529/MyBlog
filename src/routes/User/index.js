import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'user',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const UserView = require('./container/UserContainer').default;
			const UserReducer = require('../../reducers/UserReducer').default;
			let newReducer = injectReducers(store, [{ key: 'user', reducer: UserReducer}]);
			console.log(nextState);
			store.reset(newReducer,{routing:store.getState().routing});
			cb(null, UserView)
		}, 'user')
	}
})