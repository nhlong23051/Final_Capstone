import { Button, Col, Input, Modal, Row, Upload, UploadProps, message, Space, Form } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actEditUser } from './duck/action';
import { Formik, Field, FormikProps, useFormik, FormikErrors } from 'formik';

type Props = {}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


export default function Proflie({ }: Props) {
  const myProfile = JSON.parse(localStorage.getItem('user') || '')
  const dispatch: any = useDispatch()
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  if (myProfile === '') return <Navigate to='/login' replace={true} />

  const handleUpdate = (values: any) => {
    dispatch(actEditUser(values))
  }

  // ------------------------------ setting Change Avatar -----------------------------------------

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}><img className='rounded-full relative' style={{ width: '200px', height: '200px' }} src={myProfile.avatar} alt='' /></div>
      {loading ? <LoadingOutlined /> : <div className='text-xl absolute top-36 text-blue-400' style={{ left: '35px' }}>Change avatar</div>}
    </div>
  );

  return (
    <div className='px-52'>
      <p className='text-center text-4xl py-6'>My Profile</p>


      <Row className='flex flex-grow'>

        <Col span={8}>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader "
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>

        <Col span={16}>
          <Form onFinish={handleUpdate} className='w-full' initialValues={{
            id: myProfile.id,
            passWord: '',
            email: myProfile.email,
            name: myProfile.name,
            phoneNumber: myProfile.phoneNumber,
          }}>
            <p className='text-xl'>Hello, {myProfile.name}!</p>

            <label>ID <span className='text-red-500'>*</span></label>
            <Form.Item name='id'>
              <Input className='mb-5' defaultValue={myProfile.id} disabled />
            </Form.Item>

            <label>Email <span className='text-red-500'>*</span></label>
            <Form.Item name='email'>
              <Input className='mb-5' defaultValue={myProfile.email} />
            </Form.Item>

            <label>Name <span className='text-red-500'>*</span></label>
            <Form.Item name='name'>
              <Input className='mb-5' defaultValue={myProfile.name}></Input>
            </Form.Item>

            <label>Phone number <span className='text-red-500'>*</span></label>
            <Form.Item name='phoneNumber'>
              <Input className='mb-5' defaultValue={myProfile.phoneNumber}></Input>
            </Form.Item>

            <div >Password <span className='text-red-500 pb-4'>*</span>
              <Form.Item
                name="passWord"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>
            <br />
            <hr />
            <div className='flex justify-end'>
              <button type='submit' className='px-10 mx-4 bg-green-700 rounded hover:text-white'>Update</button>
              <Button><NavLink to='/' >Back to Home</NavLink></Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div >
  )
}