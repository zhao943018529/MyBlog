let initialState={
	status:'Register',
	message:''	
};



export const submit_success = (data)=>({type:'SUBMIT_SUCCESS',payload:data});
export const submit_start = ()=>({type:'SUBMIT_START'});
export const submit_error = (err)=>({type:'SUBMIT_ERROR',error:err.message});

export default function(state=initialState,action){
	switch(action.type){
		case 'SUBMIT_SUCCESS':
			return {
				status:action.payload.status,
				message:action.payload.message
			};
		case 'SUBMIT_START':
			return {
				status:'REGISTING'
			};
		case 'SUBMIT_ERROR':
				return {
					status:'ServerErr',
					message:action.error
				};
			default:
			return state;
	}
}