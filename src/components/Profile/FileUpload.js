import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Message from './Message';
import ProgressBar from './ProgressBar';

const FileUpload = () => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Upload File');
	const [ uploadedFile, setUploadedFile ] = useState({});
	const [ message, setMessage ] = useState('');
	const [ uploadPercentage, setUploadPercentage ] = useState(0);

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVER}/uploads/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					setUploadPercentage(parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total));

					// clear percentage
					setTimeout(() => setUploadPercentage(0), 5000);
				}
			});

			const { fileName, filePath } = res.data;
			console.log(fileName, filePath);

			setUploadedFile({ fileName, filePath });

			setMessage('File Uploaded succesfully');
		} catch (err) {
			if (err) {
				setMessage('Server Issue');
			} else {
				setMessage(err.response.data.msg);
			}
		}
	};

	// // connect to cloudinary
	// var CLOUDINARTY_URL = 'https://api.cloudinary.com/v1_1/filmably-app/uploads';
	// var CLOUDINARY_UPLOAD_PRESET = 'profile_picture';

	// var imgPreview = document.getElementById('uploaded-profile-picture');
	// var fileUploader = document.getElementById('file-uploader');

	// fileUploader.addEventListener('change', function(event) {
	// 	var file = event.target.files[0];
	// 	var formData = new FormData();
	// 	formData.append('file', file);
	// 	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

	// 	axios({
	// 		url: CLOUDINARTY_URL,
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-type': 'application/x-www-form-urlencoded'
	// 		},
	// 		data: formData
	// 	})
	// 		.then(function(res) {
	// 			console.log(res);
	// 		})
	// 		.catch(function(err) {
	// 			console.log(err);
	// 		});
	// });

	return (
		<Fragment>
			{message ? <Message msg={message} /> : null}

			<form onSubmit={onSubmit}>
				<div className='custome-file mb-4'>
					<input type='file' className='custome-file-input' id='customFile' onChange={onChange} />

					<label id='file-uploader' className='custome-file-label' htmlFor='customFile'>
						{fileName}
					</label>
				</div>

				<ProgressBar percentage={uploadPercentage} />

				<input type='submit' value='upload' className='btn btn-block mt-4' id='customFile' />
			</form>
			{uploadedFile ? (
				<div className='row mt-5'>
					{uploadedFile.fileName}
					{/* 
					!!!!! IMPORTANTE !!! path ne valja brijem, jer ne prikazuje sliku */}
					{/* <img id='uploaded-profile-picture' src={uploadedFile.filePath} alt='my profile picture' /> */}
				</div>
			) : null}
		</Fragment>
	);
};

export default FileUpload;
