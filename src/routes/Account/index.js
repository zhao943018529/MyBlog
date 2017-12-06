import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'account',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const AccountView = require('./container/AccountContainer').default;
			const AccountReducer = require('../../reducers/AccountReducer').default;
			let newReducer = injectReducers(store, [{ key: 'account', reducer: AccountReducer}]);
			store.reset(newReducer);
			cb(null, AccountView)
		}, 'account')
	}
})