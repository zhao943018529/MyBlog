import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
export default class AppContainer extends React.Component{

	render(){
		let {store,routes,history} = this.props;
		return (
				<Provider store={store}>
					<div style={{width:'100%'}}>
						<Router history={history} children={routes} />
					</div>
				</Provider>
			);
	}
}