import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Upload File');
	const [ uploadedFile, setUploadedFile ] = useState({});

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await axios.post('${__dirname}/client/public/uploads/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			const { fileName, filePath } = res.data;

			setUploadedFile({ fileName, filePath });
		} catch (err) {
			if (err.response.status === 500) {
				console.log('Server issue');
			} else {
				console.log(err.response.data.msg);
			}
		}
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className='custome-file mb-4'>
					<input type='file' className='custome-file-input' id='customFile' onChange={onChange} />

					<label className='custome-file-label' htmlFor='customFile'>
						{fileName}
					</label>
				</div>

				<input type='submit' value='upload' className='btn btn-block mt-4' id='customFile' />
			</form>
		</Fragment>
	);
};

export default FileUpload;
