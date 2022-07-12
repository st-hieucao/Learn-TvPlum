import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../../partials/avatar';

const UploadAvatar = () => {
  const defaultImage = 'https://res.cloudinary.com/caokhahieu/image/upload/v1630225166/zalo/anonymous_bujoil.jpg'
  const [previewImage, setPreviewImage] = useState(defaultImage);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  }

  return (
    <div className='upload-avatar'>
      <label htmlFor="input-avatar" >
        <Avatar src={previewImage} />
      </label>
      <input
        id="input-avatar"
        type="file"
        onChange={handleFileInputChange}
        hidden
      ></input>
    </div>
  )
}

export default UploadAvatar