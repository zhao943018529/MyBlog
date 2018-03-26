import { injectReducers } from '../../../../reducers/createReducers';

export default (store) => ({
	path: 'optTag',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const TagManageView = require('./container/TagManageContainer').default;
			const TagModule = require('../../../../reducers/TagReducer');
			let newReducer = injectReducers(store,[{key:'tag',reducer:TagModule.default}]);
			let preState = store.getState();
			store.reset(newReducer,{...preState,tag:TagModule.initialState});
			cb(null, TagManageView);
		}, 'optTag')
	}
});
