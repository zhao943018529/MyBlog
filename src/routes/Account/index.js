import { injectReducers } from '../../reducers/createReducers';
 import  AddBlog from './routes/AddBlog';
// import AccountContainer from './container/AccountContainer';

// export default (store) => ({
// 	path: 'account',
// 	indexRoute:AddBlog(store),
// 	component:AccountContainer,
// 	childRoutes:[
// 		AddBlog(store)
// 	]
// });

export default (store) => ({
	path: 'account',
	childRoutes: [
		AddBlog(store)
	],
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const AccountContainer = require('./container/AccountContainer').default;
			let newReducer = injectReducers(store);
			store.reset(newReducer);
			cb(null, AccountContainer)
		}, 'account')
	}
})