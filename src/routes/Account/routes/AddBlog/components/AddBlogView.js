import React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
} from 'draft-js';
import {
  Editor,
  createEditorState,
  BreakSideButton,
  TodoBlock,
  AtomicBlock,
  CaptionBlock,
  QuoteCaptionBlock,
  rendererFn,
  keyBindingFn,
  customStyleMap,
  beforeInput,
  findLinkEntities,
  Link,
  RenderMap,
  StringToTypeMap,
} from 'medium-draft';
import MyImageSideButton from 'mydraft/components/MyImageSideButton';
import 'medium-draft/lib/index.css';

const { hasCommandModifier } = KeyBindingUtil;

export default class AddBlogView extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			editorState: createEditorState(),
			editorEnabled: true,
			placeholder: 'Write here...',
		};

		this.onChange = (editorState, callback = null) => {
			if (this.state.editorEnabled) {
				this.setState({
					editorState
				}, () => {
					if (callback) {
						callback();
					}
				});
			}
		};

		this.sideButtons = [{
			title: 'Image',
			component: MyImageSideButton,
		}, {
			title: 'Embed',
			component: EmbedSideButton,
		}, {
			title: 'Separator',
			component: SeparatorSideButton,
		}];
		this.exporter = setRenderOptions({
			styleToHTML,
			blockToHTML: newBlockToHTML,
			entityToHTML: newEntityToHTML,
		});

		this.getEditorState = () => this.state.editorState;
		this.renderHTML = this.renderHTML.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.loadSavedData = this.loadSavedData.bind(this);
		this.keyBinding = this.keyBinding.bind(this);
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.handleDroppedFiles = this.handleDroppedFiles.bind(this);
		this.handleReturn = this.handleReturn.bind(this);
	}

	rendererFn(setEditorState, getEditorState) {
		const atomicRenderers = {
			embed: AtomicEmbedComponent,
			separator: AtomicSeparatorComponent,
		};
		const rFnOld = rendererFn(setEditorState, getEditorState);
		const rFnNew = (contentBlock) => {
			const type = contentBlock.getType();
			switch (type) {
				case Block.ATOMIC:
					return {
						component: AtomicBlock,
						editable: false,
						props: {
							components: atomicRenderers,
						},
					};
				default:
					return rFnOld(contentBlock);
			}
		};
		return rFnNew;
	}

	keyBinding(e) {
		if (hasCommandModifier(e)) {
			if (e.which === 83) { /* Key S */
				return 'editor-save';
			}
			// else if (e.which === 74 /* Key J */) {
			//  return 'do-nothing';
			//}
		}
		if (e.altKey === true) {
			if (e.shiftKey === true) {
				switch (e.which) {
					/* Alt + Shift + L */
					case 76:
						return 'load-saved-data';
						/* Key E */
						// case 69: return 'toggle-edit-mode';
				}
			}
			if (e.which === 72 /* Key H */ ) {
				return 'toggleinline:HIGHLIGHT';
			}
		}
		return keyBindingFn(e);
	}

	handleKeyCommand(command) {
		if (command === 'editor-save') {
			window.localStorage['editor'] = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
			return true;
		} else if (command === 'load-saved-data') {
			this.loadSavedData();
			return true;
		} else if (command === 'toggle-edit-mode') {
			this.toggleEdit();
		}
		return false;
	}

	loadSavedData() {
		const data = window.localStorage.getItem('editor');
		if (data === null) {
			return;
		}
		try {
			const blockData = JSON.parse(data);
			this.onChange(EditorState.push(this.state.editorState, convertFromRaw(blockData)), this._editor.focus);
		} catch (e) {
			console.log(e);
		}
	}

	toggleEdit(e) {
		this.setState({
			editorEnabled: !this.state.editorEnabled
		});
	}

	handleDroppedFiles(selection, files) {
		const file = files[0];
		if (file.type.indexOf('image/') === 0) {
			// eslint-disable-next-line no-undef
			const src = URL.createObjectURL(file);
			this.onChange(addNewBlockAt(
				this.state.editorState,
				selection.getAnchorKey(),
				Block.IMAGE, {
					src,
				}
			));
			return HANDLED;
		}
		return NOT_HANDLED
	}

	handleReturn(e) {
		return NOT_HANDLED;
	}
	
	render(){
		const { editorState, editorEnabled } = this.state;
		return (
			<form>
			<div className="form-group row">
			    <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="title" placeholder="title..." />
			    </div>
			</div>
			<div className="form-group row">
			    <label htmlFor="category" className="col-sm-2 col-form-label">Category:</label>
			    <div className="col-sm-10">
				<select className="form-control" id="category" defaultValue="0">
			        <option value="0">Choose...</option>
			        <option value="1">One</option>
			        <option value="2">Two</option>
			        <option value="3">Three</option>
			     </select>
			    </div>
			</div>
				<div className="form-group">
			        <Editor
			          ref={(e) => {this._editor = e;}}
			          editorState={editorState}
			          onChange={this.onChange}
			          editorEnabled={editorEnabled}
			          handleDroppedFiles={this.handleDroppedFiles}
			          handleKeyCommand={this.handleKeyCommand}
			          placeholder={this.state.placeholder}
			          keyBindingFn={this.keyBinding}
			          beforeInput={handleBeforeInput}
			          handleReturn={this.handleReturn}
			          sideButtons={this.sideButtons}
			          rendererFn={this.rendererFn}
			        />
				</div>
			</form>
			);
	}
}