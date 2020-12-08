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

	return (
		<Fragment>
			{message ? <Message msg={message} /> : null}

			<form onSubmit={onSubmit}>
				<div className='custome-file mb-4'>
					<input type='file' className='custome-file-input' id='customFile' onChange={onChange} />

					<label className='custome-file-label' htmlFor='customFile'>
						{fileName}
					</label>
				</div>

				<ProgressBar percentage={uploadPercentage} />

				<input type='submit' value='upload' className='btn btn-block mt-4' id='customFile' />
			</form>
			{uploadedFile ? (
				<div className='row mt-5'>
					{uploadedFile.fileName}
					<img id='uploaded-profile-picture' src={uploadedFile.filePath} alt='my profile picture' />
				</div>
			) : null}
		</Fragment>
	);
};

export default FileUpload;
