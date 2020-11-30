import React, { useState, useEffect, useRef } from 'react';

const Thumbnail = () => {
	const [ image, setImage ] = useState(null);
	const canvas = useRef(null);

	useEffect(() => {
		const image = new Image();
		image.src = 'https://thiscatdoesnotexist.com/';
		image.onload = () => setImage(image);
	}, []);

	useEffect(
		() => {
			if (image && canvas) {
				const ctx = canvas.current.getContext('2d');
				ctx.drawImage(image, 0, 0, 90, 90);
			}
		},
		[ image, canvas ]
	);

	return <canvas ref={canvas} />;
};

export default Thumbnail;
