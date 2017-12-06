const initialState = {
	status:'NoLogin'
};

export const fetch_user_success = (data)=>({type:'FETCH_USER_SUCCESS',payload:data});
export const fetch_user_start = ()=>({type:'FETCH_USER_START'});
export const fetch_user__error = (err)=>({type:'FETCH_USER__ERROR',error:err.message});

export default function(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_USER_SUCCESS':
			return {
				status: action.payload.status,
				user: action.payload.user
			};
		case 'FETCH_USER__ERROR':
			return {
				...state,
				status: 'ServerErr'
			};
		default:
			return state;
	}
}