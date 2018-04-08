import React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
} from 'draft-js';
import {
  Editor,
  Block,
  createEditorState,
  BreakSideButton,
  TodoBlock,
  CaptionBlock,
  QuoteCaptionBlock,
  rendererFn,
  keyBindingFn,
  customStyleMap,
  beforeInput,
  findLinkEntities,
  Link,
  RenderMap,
  getCurrentBlock,
  StringToTypeMap,
  addNewBlockAt,
  HANDLED,
  NOT_HANDLED
} from 'medium-draft';
import {
	AtomicBlock,
	AnnotationComponent,
	AtomicEmbedComponent,
	AtomicSeparatorComponent,
	EmbedSideButton,
	SeparatorSideButton
} from './components/MediumComponents';
import {
	setRenderOptions,
  blockToHTML,
  entityToHTML,
  styleToHTML} from 'medium-draft/lib/exporter';
import MyImageSideButton from 'mydraft/components/MyImageSideButton';
import 'medium-draft/lib/index.css';

const newBlockToHTML = (block) => {
  const blockType = block.type;
  if (block.type === Block.ATOMIC) {
    if (block.text === 'E') {
      return {
        start: '<figure class="md-block-atomic md-block-atomic-embed">',
        end: '</figure>',
      };
    } else if (block.text === '-') {
      return <div className="md-block-atomic md-block-atomic-break"><hr/></div>;
    }
  }
  return blockToHTML(block);
};
const newEntityToHTML = (entity, originalText) => {
  if (entity.type === 'embed') {
    return (
      <div>
        <a
          className="embedly-card"
          href={entity.data.url}
          data-card-controls="0"
          data-card-theme="dark"
        >Embedded ― {entity.data.url}
        </a>
      </div>
    );
  }
  return entityToHTML(entity, originalText);
};

const newTypeMap = StringToTypeMap;
newTypeMap['2.'] = Block.OL;

const DQUOTE_START = '“';
const DQUOTE_END = '”';
const SQUOTE_START = '‘';
const SQUOTE_END = '’';
const handleBeforeInput = (editorState, str, onChange) => {
  if (str === '"' || str === '\'') {
    const currentBlock = getCurrentBlock(editorState);
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const text = currentBlock.getText();
    const len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      return HANDLED;
    } else if (len > 0) {
      const lastChar = text[len - 1];
      if (lastChar !== ' ') {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_END : SQUOTE_END)), 'transpose-characters'));
      } else {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      }
      return HANDLED;
    }
  }
  return beforeInput(editorState, str, onChange, newTypeMap);
};



const { hasCommandModifier } = KeyBindingUtil;

export default class MediumDraftEditor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			editorState: createEditorState(props.content&&JSON.parse(props.content)),
			editorEnabled: props.editorEnabled,
			placeholder: 'Write here...',
		};

		this.onChange = (editorState, callback = null) => {
			if (this.state.editorEnabled) {
				let content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
				this.props.onValueSave(content);
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

	renderHTML(e) {
		const currentContent = this.state.editorState.getCurrentContent();
		const eHTML = this.exporter(currentContent);
		var newWin = window.open(
			`${window.location.pathname}rendered.html`,
			'windowName', `height=${window.screen.height},width=${window.screen.wdith}`);
		newWin.onload = () => {
			newWin.postMessage(eHTML, window.location.origin);
		};
		e.preventDefault();
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
			let content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
			window.localStorage['editor'] = content;
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
		e.preventDefault();
		e.stopPropagation();
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
			      <div>
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
			);
	}
}