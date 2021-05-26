import React, { useState } from 'react'

/* Lib */
import axios from 'axios';

/* Components */
import Dropzone from "react-dropzone";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function FileUpload(props) {
  const { image, setImage } = props
  const [loading, setLoading] = useState(false)

  const uploadChangeHandler = (file) => {
    setLoading(true)
    const formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/fomr-data' }
    }

    formData.append('file', file[0])
    formData.append('_id', window.localStorage.getItem('userId'))

    axios.post('http://localhost:5000/api/users/image', formData, config)
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
    <div style={{ textAlign: 'center' }}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>프로필 이미지 업로드</div>
    </div>
  );

  return (
    <div>
      <Dropzone onDrop={uploadChangeHandler} >
        {({ getRootProps, getInputProps }) => (
          <div style={{
            border: 'lightgray',
            display: 'flex', alignItems: 'center', justifyContent: 'center', width:'150px', height:'150px', maxWidth:'150px', maxHeight:'150px'
            ,border:'1px solid black', borderRadius:'50%'
          }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? <img src={image} alt="avatar" /> : uploadButton}
          </div>
        )}
      </Dropzone>
    </div>


  )
}

export default FileUpload
