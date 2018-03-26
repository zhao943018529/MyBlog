import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'login',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const LoginView = require('./container/LoginContainer').default;
			const SubmitModule = require('../../reducers/SubmitReducer');
			let newReducer = injectReducers(store,[{key:'login',reducer:SubmitModule.default}]);
			let preState = store.getState();
			store.reset(newReducer,{...preState,login:SubmitModule.initialState});
			cb(null, LoginView)
		}, 'login')
	}
});
