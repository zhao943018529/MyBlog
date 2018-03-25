let initialState={
	status:'',
	message:''	
};



export const submit_success = (data)=>({type:'SUBMIT_SUCCESS',payload:data});
export const submit_start = ()=>({type:'SUBMIT_START'});
export const submit_error = (err)=>({type:'SUBMIT_ERROR',error:err.message});

export default function(state=initialState,action){
	switch(action.type){
		case 'SUBMIT_SUCCESS':
			return {
				status:'Success',
			};
		case 'SUBMIT_START':
			return {
				status:'Requesting'
			};
		case 'SUBMIT_ERROR':
				return {
					status:'Failed',
					message:action.error
				};
			default:
			return state;
	}
}