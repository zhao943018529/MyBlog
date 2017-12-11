import { injectReducers } from '../../reducers/createReducers';
import  AddBlog from './routes/AddBlog';
import AccountContainer from './container/AccountContainer';

export default (store) => ({
	path: 'account',
	indexRoute:AddBlog(store),
	component:AccountContainer,
	childRoutes:[
		AddBlog(store)
	]
});