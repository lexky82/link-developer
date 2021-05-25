import React, { useState } from 'react'
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


function FileUpload(props) {

  const [Images, setImages] = useState('')
  const [loading, setLoading] = useState(false)

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      alert('JPG. PNG 파일을 업로드 하세요.');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert('이미지 크기가 2MB가 넘습니다.');
    }
    
    return isJpgOrPng && isLt2M;
  }

  const uploadChangeHandler = (info) => {

    let body = {
      _id : window.localStorage.getItem('userId'),
    }

  	axios.post('http://localhost:5000/api/users/image', body)
    .then((response) => {
      console.log('Rmx')
    })

    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setImages(imageUrl),
        setLoading(false),
      );
    }
  }
   
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>프로필 이미지 업로드</div>
    </div>
  );

  return (
    <div>
      <Upload
        style={{ borderRadius: '70%' }}
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        action="http://localhost:5000/api/users/image"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={uploadChangeHandler}
      >
        {Images ? <img src={Images} alt="avatar" style={{ width: '100%', borderRadius: '10%' }} /> : uploadButton}
      </Upload>
    </div> 
  )
}

export default FileUpload
