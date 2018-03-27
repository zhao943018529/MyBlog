export const initialState={
	message:'',
	tags:[]
};

export const fetch_tags_success = (data)=>({type:'FETCH_TAGS_SUCCESS',payload:data});
export const fetch_tags_start = ()=>({type:'FETCH_TAGS_START'});
export const fetch_tags_error = (err)=>({type:'FETCH_TAGS_FAILED',error:err.message});

export const add_tag_success = (data)=>({type:'ADD_TAG_SUCCESS',payload:data});
export const add_tag_error = (err)=>({type:'ADD_TAG_FAILED',error:err.message});

export default function(state=initialState,action){
	switch(action.type){
		case 'ADD_TAG_SUCCESS':
			return {
				...state,
				status:'ADD_TAG_SUCCESS',
			};
		case 'ADD_TAG_FAILED':
			return {
				...state,
				status:'Failed',
				message:action.error
			};
		case 'FETCH_TAGS_SUCCESS':
			return {
				...state,
				status: 'FETCH_TAGS_SUCCESS',
				tags: action.payload
			};
		case 'FETCH_TAGS_FAILED':
			return {
				...state,
				status: 'Failed',
				message:action.error
			};
		case 'FETCH_TAGS_START':
			return {
				...state,
				status: 'Fetching'
			};
		default:
			return state;
	}
}