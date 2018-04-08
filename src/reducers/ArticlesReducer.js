export const initialState = {
	status:'fetching'
};

export const fetch_articles_success = (data)=>({type:'FETCH_ARTICLES_SUCCESS',payload:data.articles});
export const fetch_articles_start = ()=>({type:'FETCH_ARTICLES_START'});
export const fetch_articles_error = (err)=>({type:'FETCH_ARTICLES_ERROR',error:err.message});

export default function(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_USER_START':
			return {
				...state,
				status:'fetching'
			}; 
		case 'FETCH_ARTICLES_SUCCESS':
			return {
				status: 'success',
				articles: action.payload
			};
		case 'FETCH_ARTICLES_ERROR':
			return {
				...state,
				status: 'failed',
				message:action.error
			};
		default:
			return state;
	}
}