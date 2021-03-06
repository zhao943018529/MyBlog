export const initialState = {
	status:'NoLogin'
};

export const fetch_user_success = (data)=>({type:'FETCH_USER_SUCCESS',payload:data.user});
export const fetch_user_start = ()=>({type:'FETCH_USER_START'});
export const fetch_user_error = (err)=>({type:'FETCH_USER_ERROR',error:err.message});

export default function(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_USER_START':
			return {
				...state,
				status:'Requesting'
			}; 
		case 'FETCH_USER_SUCCESS':
			return {
				status: 'Success',
				user: action.payload
			};
		case 'FETCH_USER_ERROR':
			return {
				...state,
				status: 'Failed',
				message:action.error
			};
		default:
			return state;
	}
}