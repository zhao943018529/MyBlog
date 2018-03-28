export const initialState={
	message:'',
	tags:[]
};

export const fetch_tags_success = (data)=>({type:'FETCH_TAGS_SUCCESS',payload:data.tags});
export const fetch_tags_start = ()=>({type:'FETCH_TAGS_START'});
export const fetch_tags_error = (err)=>({type:'FETCH_TAGS_FAILED',error:err.message});

export const add_tag_success = (data)=>({type:'ADD_TAG_SUCCESS',payload:data});
export const add_tag_error = (err)=>({type:'ADD_TAG_FAILED',error:err.message});

export const del_tag_success = (data)=>({type:'DEL_TAG_SUCCESS',payload:data});
export const del_tag_error = (err)=>({type:'DEL_TAG_FAILED',error:err.message});

export default function(state=initialState,action){
	switch(action.type){
		case 'DEL_TAG_SUCCESS':
			return {
				...state,
				message:'delete tag successfully',
				status:'success',
			};
		case 'DEL_TAG_FAILED':
			return {
				...state,
				message:action.error,
				status:'failed',
			};
		case 'ADD_TAG_SUCCESS':
			return {
				...state,
				message:'add tag successfully',
				status:'success',
			};
		case 'ADD_TAG_FAILED':
			return {
				...state,
				status:'failed',
				message:action.error
			};
		case 'FETCH_TAGS_SUCCESS':
			return {
				...state,
				status: 'success',
				message:'fetch tags successfully',
				tags: action.payload
			};
		case 'FETCH_TAGS_FAILED':
			return {
				...state,
				status: 'failed',
				message:action.error
			};
		case 'FETCH_TAGS_START':
			return {
				...state,
				message:'fetching tags',
				status: 'fetching'
			};
		default:
			return state;
	}
}