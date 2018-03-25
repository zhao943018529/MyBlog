import 'whatwg-fetch';


function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		let error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

function parseJSON(response) {
  return response.json()
}

export default function createRequest(url,option,actions){
	return dispatch =>{
		if(actions.start){
			dispatch(actions.start());
		}

		return fetch(url,option).then(checkStatus).then(parseJSON)
		.then(function(data){
			if(data.status>300&&data.status<400){
				throw new Error(data.message);
			}else{
				dispatch(actions.success(data));
			}
		}).catch(function(err){
			dispatch(actions.failed(err));
		});
	}
}