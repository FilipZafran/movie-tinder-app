import React, { useState } from 'react';

function FileUploader() {
	const [ image, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'profile_picture');
		setLoading(true);
		const res = await fetch('https://api.cloudinary.com/v1_1/filmably-app/image/upload', {
			method: 'POST',
			body: data
		});

		const file = await res.json();

		setImage(file.secure_url);
		setLoading(false);
	};

	return (
		<div>
			<h1>Uploade Image</h1>

			<input type='file' name='file' onChange={uploadImage} />
			{loading ? <h3>Loading...</h3> : <img src={image} style={{ width: '300px' }} />}
		</div>
	);
}

export default FileUploader;
