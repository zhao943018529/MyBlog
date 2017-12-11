import { injectReducers } from '../../../../reducers/createReducers';

export default (store) => ({
	path: 'addBlog',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const AddBlogView = require('./container/AddBlogContainer').default;
			cb(null, AddBlogView)
		}, 'addBlog')
	}
});
