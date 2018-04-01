import { injectReducers } from '../../reducers/createReducers';
import  AddBlog from './routes/AddBlog';
import  ManageTag from './routes/ManageTag';
import AccountContainer from './container/AccountContainer';

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
	component:AccountContainer,
	indexRoute:AddBlog(store),
	childRoutes: [
		ManageTag(store)
	],
})