import React, { useState, useEffect, useRef } from 'react';

const Thumbnail = (props) => {
  const [image, setImage] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const image = new Image();
    // image.src = `serverURL(${currentFilm['image']})`;
    // image.src = 'https://i.redd.it/6s0htlzkc1031.jpg';
    image.src = props.url;
    image.onload = () => setImage(image);
  }, []);

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext('2d');
      ctx.drawImage(image, 0, 0, 70, 80);
    }
  }, [image, canvas]);

  return <canvas ref={canvas} />;
};

export default Thumbnail;
