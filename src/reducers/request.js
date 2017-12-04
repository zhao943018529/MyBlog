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

		fetch(url,option).then(checkStatus).then(parseJSON)
		.then(function(data){
			dispatch(actions.success(data));
		}).catch(function(err){
			dispatch(actions.faild(err));
		});
	}
}