import React, { useState } from 'react';
import { Settings } from '../styleElements/icons/Settings';

function FileUploader(props) {
	const [ image, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'cloudinary_profile_pic');
		setLoading(true);
		const res = await fetch('https://api.cloudinary.com/v1_1/filmably-app/image/upload', {
			method: 'POST',
			body: data
		});

		const file = await res.json();

		setImage(file.secure_url);

		props.picture(file.secure_url);
		console.log(file);
	};

	return (
		<div className='profile__upload-div'>
			<div className='profile__upload_symbol_position'>
				<label>
					<Settings />
					<input type='file' name='file' onChange={uploadImage} />
				</label>
			</div>
			<div className='profile__image-cropper'>
				<img id='profile__circle_image' src={image} />
			</div>
		</div>
	);
}

export default FileUploader;
