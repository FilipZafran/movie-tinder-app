import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
	return (
		<div className='alert alert-infp alert-dismissible fade show' role='alert'>
			{msg}
			<button type='button' class='close' data-dismiss='alert' aria-label='Close'>
				<span aria-hidden='true'>&times;</span>
			</button>
		</div>
	);
};

Message.propTypes = {
	msg: PropTypes.string.isRequired
};

export default Message;
