import React from 'react';
import {EditorState,Editor,RichUtils,CompositeDecorator,AtomicBlockUtils} from 'draft-js';
import InlineStyleControl from './components/InlineStyleControl';
import BlockStyleControl from './components/BlockStyleControl';
import CustomStyleControl from './components/CustomStyleControl';
import LinkComponent from './components/LinkComponent';
import LinkStrategy from './modify/LinkStrategy';
import mediaBlockRenderer from './modify/MediaBlockRenderer';
import myBlockStyleFn from './modify/myBlockStyleFn';

export default class MyDraft extends React.Component{

	constructor(props){
		super(props);
		const decorator = new CompositeDecorator([{
			strategy:LinkStrategy,
			component:LinkComponent
		}])
		this.state = {
			editorState: EditorState.createEmpty(decorator),
			showURLInput: false,
			urlValue: ''
		};
		this.onChange=(editorState,callback)=>this.setState({editorState},callback&&callback());
		this.handleKeyCommand = this._handleKeyCommand.bind(this);
		this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
		this.toggleBlockType = this._toggleBlockType.bind(this);
		this.focus=()=>this.editor.focus();
		this.onURLChange = (e) => this.setState({urlValue: e.target.value});
		this.promptForLink = this._promptForLink.bind(this);
		this.confirmLink = this._confirmLink.bind(this);
		this.onLinkInputKeyDown=this._onLinkInputKeyDown.bind(this);
		this.getImage = this._getImage.bind(this);
		this.openFileBrowser = this._openFileBrowser.bind(this);
		this.customTool = this._customTool.bind(this);
	}

	_getImage(e) {
		e.preventDefault();
		let input = this.file;
		var url = input.value;
		var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
		if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
			var reader = new FileReader();

			reader.onload = (e)=> {
				input.value='';
				let {editorState} = this.state;
				let contentState = editorState.getCurrentContent();
				let contentWithEntity = contentState.createEntity('IMAGE','IMMUTABLE',{src:e.target.result});
				let entityKey = contentWithEntity.getLastCreatedEntityKey();
				let newEditorState = EditorState.set(editorState,{currentContent:contentWithEntity});
				this.setState({
					editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
				},()=>setTimeout(()=>this.focus(),0));
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	_openFileBrowser(){
		this.file.click();
	}

	_onLinkInputKeyDown(e){
		if(e.which===13){
			this._confirmLink(e);
		}
	}

	_confirmLink(e){
		e.preventDefault();
		let {editorState,urlValue} =this.state;
		let contentState = editorState.getCurrentContent();
		let contentWithEntity = contentState.createEntity('LINK','IMMUTABLE',{url:urlValue});
		let entityKey = contentWithEntity.getLastCreatedEntityKey();
		let newEditorState = EditorState.set(editorState,{currentContent:contentWithEntity});
		this.setState({
			editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
			showURLInput: false,
			urlValue: ''
		});
	}

	_promptForLink() {
		const {editorState} = this.state;
		const selection = editorState.getSelection();
		if(!selection.isCollapsed()){
			let startKey = selection.getStartKey();
			let startOffset = selection.getStartOffset();
			let contentState = editorState.getCurrentContent();
			let blockWithLinkBeginning = contentState.getBlockForKey(startKey);
			let linkKey = blockWithLinkBeginning.getEntityAt(startOffset);
			let url ='';
			if(linkKey){
				let linkInstance = contentState.getEntity(linkKey);
				url = linkInstance.getData().url;
			}
			this.setState({urlValue:url,showURLInput:true});
		}
	}

	_customTool(style){
		switch(style){
			case 'LINK':
				this._promptForLink();
				break;
			case 'IMAGE':
				this._openFileBrowser();
				break;
				default:
				break;
		}
	}

	_handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),()=>this.focus());
	}

	_toggleBlockType(blockType) {
		this.onChange(RichUtils.toggleBlockType(
			this.state.editorState,
			blockType
		),()=>this.focus());
	}

	render(){
		let {editorState,showURLInput,urlValue} = this.state;
		let contentState = editorState.getCurrentContent();
		let className = 'RichEditor-editor';
		if(!contentState.hasText()){
			if(contentState.getBlockMap().first().getType()!=='unstyled'){
				className+=' RichEditor-hidePlaceholder';
			}
		}
		let linkTip;
		if(showURLInput){
			linkTip=(
				<div>
                <input
                  onChange={this.onURLChange}
                  ref="url"
                  type="text"
                  value={urlValue}
                  onKeyDown={this.onLinkInputKeyDown}
                />
                <button onMouseDown={this.confirmLink}>
                  Confirm
                </button>
              </div>);
		}
		return (
			<div className="draft-container">
				<div className="draft-operator">
					<InlineStyleControl editorState={editorState} onToggle={this.toggleInlineStyle}/>
					<BlockStyleControl  editorState={editorState} onToggle={this.toggleBlockType}/>
					<CustomStyleControl editorState={editorState} onToggle={this.customTool}/>
				</div>
				<div className={className} onClick={this.focus}>
					<Editor
						onChange={this.onChange}
						editorState={editorState}
						customStyleMap={styleMap}
						ref={(ref)=>this.editor=ref}
						placeholder="Write your article..."
						blockRendererFn={mediaBlockRenderer}
						handleKeyCommand={this.handleKeyCommand}
						blockStyleFn={myBlockStyleFn}
					/>
				</div>
				{linkTip}
				<input type="file" name="file" onChange={this.getImage} className="inputfile" ref={(ref)=>this.file=ref}/>	
			</div>
			);
	}
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
