export default function myBlockStyleFn(contentBlock){
	const type = contentBlock.getType();
	if(type==='blockquote'){
		return 'RichEditor-blockquote';
	}
}