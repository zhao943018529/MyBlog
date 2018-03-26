export const initialState = {
	articles: [{
		id: '1111',
		title: 'aaaa',
		author: 'Mr zhao',
		body: 'sadfasfdasfdas'
	}, {
		id: '2222',
		title: 'bbbb',
		author: 'Mr cc',
		body: 'abcdefghijk'
	}]
}


export default function(state=initialState,action){
	switch(action.type){
		default:
		return state;
	}
}