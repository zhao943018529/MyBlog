import React from 'react';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote',className:'fa fa-square'},
  {label: 'UL', style: 'unordered-list-item',className:'fa fa-list-ul'},
  {label: 'OL', style: 'ordered-list-item',className:'fa fa-list-ol'},
  {label: 'Code Block', style: 'code-block',className:'fa fa-window-maximize'},

];

export default function BlockStyleControl(props){
  let {editorState} = props;
  let contentState = editorState.getCurrentContent();
  let type = contentState.getBlockForKey(editorState.getSelection().getStartKey()).getType();
  return (
    <div className="editor-control">
      {BLOCK_TYPES.map(item=><StyleButton
        key={item.label}
        {...item}
        active={type===item.style}
        onToggle={props.onToggle}
       />)}
    </div>
    );

}