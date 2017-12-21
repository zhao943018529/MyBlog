import React from 'react';
import StyleButton from './StyleButton';

var INLINE_STYLES = [
  {label: 'Bold',className:'fa fa-bold',style: 'BOLD'},
  {label: 'Italic',className:'fa fa-italic', style: 'ITALIC'},
  {label: 'Underline',className:'fa fa-underline', style: 'UNDERLINE'},
  {label: 'Monospace',className:'fa fa-outdent', style: 'CODE'},
];



export default function InlineStyleControl(props){
	let {editorState} = props;
	let inlineStyle = editorState.getCurrentInlineStyle();
	return (
		<div className="editor-control">
			{INLINE_STYLES.map(item=><StyleButton
				key={item.label}
				{...item}
				active={inlineStyle.has(item.style)}
				onToggle={props.onToggle}
			 />)}
		</div>
		);

}