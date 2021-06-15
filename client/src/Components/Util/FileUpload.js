import React, { useState } from 'react'

/* Lib */
import axios from 'axios';

/* Components */
import react, { useEffect } from 'react';
import Dropzone from "react-dropzone";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function FileUpload(props) {
  const { propsImage } = props

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  useEffect(() => {
    if(!propsImage){
      return
    }

    setImage(propsImage)
  }, [propsImage])
 

  const uploadChangeHandler = (file) => {
    setLoading(true)
    const formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/fomr-data' }
    }

    formData.append('file', file[0])
    formData.append('_id', window.localStorage.getItem('userId'))

    axios.post('/api/users/image', formData, config)
      .then(response => {
        if (response.data.success) {
          setImage(response.data.file.path)
          setLoading(false)
        } else {
          alert('이미지를 저장하는데 실패했습니다.')
        }
      })
  }

  const uploadButton = (
    <div style={{ textAlign: 'center', marginTop:'35px' }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>프로필 이미지 업로드</div>
    </div>
  );

  return (
    <div>
      <Dropzone onDrop={uploadChangeHandler}>
        {({ getRootProps, getInputProps }) => (
          <div className="keyinfo__Dropzone"
            {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? <img src={`http://3.16.138.36:5000/${image}`} alt="avatar" /> : uploadButton}
          </div> 
        )}
      </Dropzone>
    </div>


  )
}

export default FileUpload
