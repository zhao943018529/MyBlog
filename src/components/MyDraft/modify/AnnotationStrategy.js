const HANDLE_REGEX=/\/\/\w*/g;

export default function annotationStrategy(contentBlock,callback,contentState){
	handleAnnotation(HANDLE_REGEX,contentBlock,callback);
}


function handleAnnotation(regex,contentBlock,callback){
	const type = contentBlock.getType();
	if(type==='code-block'){
		const text = contentBlock.getText();
		let matchArr,start;
		while((matchArr=regex.exec(text))!==null){
			start = matchArr.index;
			callback(start,matchArr[0].length);
		}
	}
}