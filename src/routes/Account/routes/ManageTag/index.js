import { injectReducers } from '../../../../reducers/createReducers';

export default (store) => ({
	path: 'optTag',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const TagManageView = require('./container/TagManageContainer').default;
			const TagReducer = require('../../../../reducers/TagReducer').default;
			let newReducer = injectReducers(store,[{key:'tag',reducer:TagReducer}]);
			store.reset(newReducer);
			cb(null, TagManageView)
		}, 'optTag')
	}
});
