import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path: 'register',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const RegisterView = require('./container/RegisterContainer').default;
			let newReducer = injectReducers(store);
			store.reset(newReducer,{routing:store.getState().routing});
			cb(null, RegisterView)
		}, 'register')
	}
})