import { injectReducers } from '../../reducers/createReducers';

export default (store) => ({
	path:'article/detail/:id',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const ArticleView = require('./container/ArticleContainer').default;
			cb(null, ArticleView)
		}, 'ad')
	}
});