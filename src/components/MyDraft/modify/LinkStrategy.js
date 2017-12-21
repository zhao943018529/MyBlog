export default function findLinkEntities(contentBlock,callback,contentState){
	contentBlock.findEntityRanges((character)=>{
		let entityKey = character.getEntity();
		return entityKey!==null&&contentState.getEntity(entityKey).getType()==='LINK';
	},callback);
}