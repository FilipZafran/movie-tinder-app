import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { lightGreen } from '@material-ui/core/colors';

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
			const res = await axios.post(`${process.env.REACT_APP_SERVER}/uploads/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			const { fileName, filePath } = res.data;
			console.log(fileName, filePath);

			setUploadedFile({ fileName, filePath });
		} catch (err) {
			console.error(err);
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
