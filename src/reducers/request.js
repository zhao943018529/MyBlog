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



export function requrestData(url,option,callbacks){
	if(callbacks&&callbacks.length===3){
		callbacks.splice(0,1)[0]();
	}
	
	fetch(url,option).then(checkStatus).then(parseJSON).then((data)=>{
			if(data.status>300&&data.status<400){
				throw new Error(data.message);
			}else{
				callbacks[0](data.data);
			}
	}).catch(err=>{
		callbacks[1](err);
	});
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
				if(actions.aftersuc){
					let tid = setTimeout(()=>{
						clearTimeout(tid);
						actions.aftersuc();
					},1000);
				}
			}
		}).catch(function(err){
			dispatch(actions.failed(err));
		});
	}
}