import { injectReducers } from '../../../../reducers/createReducers';

export default (store) => ({
	path: 'optTag',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const TagManageView = require('./container/TagManageContainer').default;
			cb(null, TagManageView)
		}, 'optTag')
	}
});