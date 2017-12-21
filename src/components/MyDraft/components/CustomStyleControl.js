import React from 'react';
import StyleButton from './StyleButton';

const CUSTOM_TYPES = [
  {label: 'Link', style: 'LINK',className:'fa fa-link'},
  {label: 'Image', style: 'IMAGE',className:'fa fa-file-image-o'},
];

export default function CustomStyleControl(props){
  
  return (
    <div className="editor-control">
      {CUSTOM_TYPES.map(item=><StyleButton
        key={item.label}
        {...item}
        active={false}
        onToggle={props.onToggle}
       />)}
    </div>
    );

}