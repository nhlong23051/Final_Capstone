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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [user, updateUser] = useState({
    id: myProfile.id,
    passWord: '',
    email: myProfile.email,
    name: myProfile.name,
    phoneNumber: myProfile.phoneNumber,
  })

  useEffect(() => {
    if (user.passWord !== '') {
      console.log(user);

      dispatch(actEditUser(user))
    }
  }, [user.passWord])

  if (myProfile === '') return <Navigate to='/login' replace={true} />

  // ----------------------- setting modal change password -----------------------------------
  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangePass = (values: any) => {
    let { passWord, confirm } = values

    updateUser({
      ...user,
      passWord,
    })

    if (passWord && confirm) {
      setIsModalOpen(false);
    }
  };


  // ----------------------- setting modal confirm -----------------------------------
  const showModalConfirm = () => {
    setModalConfirm(true)
  }

  const confirmCancel = () => {
    setModalConfirm(false)
  }

  const onConfirm = (values: any) => {
    let { passWord } = values

    updateUser({
      ...user,
      passWord,
    })


    if (passWord) {
      setModalConfirm(false);
    }
  };

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
          <p className='text-xl'>Hello, {myProfile.name}!</p>

          <label>ID <span className='text-red-500'>*</span></label>
          <Input className='mb-5' value={myProfile.id} disabled />

          <label>Email <span className='text-red-500'>*</span></label>
          <Input className='mb-5' value={myProfile.email} />

          <label>Name <span className='text-red-500'>*</span></label>
          <Input className='mb-5' value={myProfile.name} />

          <label>Phone number <span className='text-red-500'>*</span></label>
          <Input className='mb-5' value={myProfile.phoneNumber} />

          <div >Password <span className='text-red-500 pb-4'>*</span>
            <Button className='ml-4' onClick={showModal}>Change Password</Button>
          </div>
          <br />
          <hr />
          <div className='flex justify-end'>
            <Button onClick={showModalConfirm} className='px-10 mx-4 bg-green-700'>Update</Button>
            <Button><NavLink to='/' >Back to Home</NavLink></Button>
          </div>
        </Col>
      </Row>




      {/* ------------------------ Modal Change Password ------------------------------*/}
      <Modal title='Change Password' open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Form onFinish={onChangePass} form={form} >
          <div className="mt-2">
            <label>New password<span className='text-red-500 '>*</span></label>
            <Form.Item
              name="passWord"
              initialValue=''
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <label>Confirm new password<span className='text-red-500 '>*</span></label>
            <Form.Item
              name="confirm"
              dependencies={['passWord']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passWord') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

          </div>
          <div className='flex mt-5'>
            <button
              type="submit"
              className="flex mx-2 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Change password
            </button>
            <button
              className="flex mx-2 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Modal>




      {/* ----------------------------- Modal Confirm ----------------------------------- */}
      <Modal title='Confirm password' open={modalConfirm} onCancel={confirmCancel} footer={[]}>
        <Form onFinish={onConfirm} form={form} className='space-y-6'>
          <div className="mt-2">
            <label>Your password<span className='text-red-500 '>*</span></label>
            <Form.Item
              name="passWord"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </div>
          <div className='flex'>
            <button
              type="submit"
              className="flex mx-2 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
            <button
              type="submit"
              className="flex mx-2 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={confirmCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Modal>

    </div >
  )
}