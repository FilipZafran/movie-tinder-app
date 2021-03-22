import React, { useState } from 'react';
import { UploadIcon } from '../styleElements/icons/UploadIcon';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Redux/userSlice';

const Container = styled.div`
  position: relative;
  z-index: 1;
`;

const UploadSymbol = styled.div`
  position: absolute;
  top: 120px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--dark-300-50);
  border-radius: 50px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Input = styled.input`
  display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
  position: absolute;
  top: 80px;
  left: -50px;
`;

const Cropper = styled.div`
  width: 185px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  img {
    max-width: 120%;
  }
`;

function FileUploader(props) {
  const currentUser = useSelector(selectCurrentUser);

  const [image, setImage] = useState(currentUser.picture || '');
  const [show, setShow] = useState(false);

  // const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'cloudinary_profile_pic');
    // setLoading(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/filmably-app/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();

    setImage(file.secure_url);
    props.getPicture(file.secure_url);
  };

  return (
    <Container>
      <UploadSymbol onClick={() => setShow(!show)}>
        <UploadIcon size={24} />
      </UploadSymbol>
      <Input
        display={show.toString()}
        type="file"
        name="file"
        onChange={uploadImage}
      />

      <Cropper>
        <img src={image} alt={image} />
      </Cropper>
    </Container>
  );

  // take image and pass it up to Profile or to redux + save to BE
}

export default FileUploader;
