import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'register',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const RegisterView = require('./container/RegisterContainer').default;
			const SubmitReducer = require('../../reducers/SubmitReducer').default;
			let newReducer = injectReducers(store,[{key:'register',reducer:SubmitReducer}]);
			store.reset(newReducer);
			cb(null, RegisterView)
		}, 'register')
	}
})