import MediaComponent from '../components/MediaComponent';

export default function mediaBlockRenderer(block){
	if(block.getType()==='atomic'){
		return {
			component:MediaComponent,
			editable:false,
		}
	}
	return null;
}