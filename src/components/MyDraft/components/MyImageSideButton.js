import React from 'react';
import {ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor} from 'medium-draft';
import 'whatwg-fetch';

export default class MyImageSideButton extends ImageSideButton{
	onChange(e) {
		const file = e.target.files[0];
		if (file.type.indexOf('image/') === 0) {
			// This is a post request to server endpoint with image as `image`
			const formData = new FormData();
			formData.append('image', file);
			fetch('/photo/upload', {
				method: 'POST',
				body: formData,
			}).then((response) => {
				if (response.status === 200) {
					// Assuming server responds with
					// `{ "url": "http://example-cdn.com/image.jpg"}`
					return response.json().then(data => {
						if (data.url) {
							this.props.setEditorState(addNewBlock(
								this.props.getEditorState(),
								Block.IMAGE, {
									src: data.url,
								}
							));
						}
					});
				}
			});
		}
		this.props.close();
	}
}