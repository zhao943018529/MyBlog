import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'login',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const LoginView = require('./container/LoginContainer').default;
			const SubmitReducer = require('../../reducers/SubmitReducer').default;
			let newReducer = injectReducers(store,[{key:'login',reducer:SubmitReducer}]);
			store.reset(newReducer);
			cb(null, LoginView)
		}, 'login')
	}
})