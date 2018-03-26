import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'register',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const RegisterView = require('./container/RegisterContainer').default;
			const SubmitModule = require('../../reducers/SubmitReducer');
			let newReducer = injectReducers(store,[{key:'register',reducer:SubmitModule.default}]);
			let preState = store.getState();
			store.reset(newReducer,{...preState,home:SubmitModule.initialState});
			cb(null, RegisterView)
		}, 'register')
	}
})