import { Button, Drawer, Form, Input } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actEditUser } from '../duck/action';
import { CLOSE_DRAWER_CREATE_TASK } from '../../CreateTask/duck/const';

type Props = {
    data: any
}

export default function FormEditUser({ data }: Props) {
    const dispatch: any = useDispatch()

    const handleUpdate = (value: any) => {
        console.log(value);
        dispatch(actEditUser(value))
        dispatch({type:CLOSE_DRAWER_CREATE_TASK})
    }

    return (
        <>
            <div>Edit user</div>
            <Form onFinish={handleUpdate} className='w-full' initialValues={{
                id: data?.userId,
                passWord: '',
                email: data?.email,
                name: data?.name,
                phoneNumber: data?.phoneNumber,
            }}>
                <p className='text-xl'>Hello, {data?.name}!</p>

                <label>ID <span className='text-red-500'>*</span></label>
                <Form.Item name='id'>
                    <Input className='mb-5' defaultValue={data?.id} disabled />
                </Form.Item>

                <label>Email <span className='text-red-500'>*</span></label>
                <Form.Item name='email'>
                    <Input className='mb-5' defaultValue={data?.email} />
                </Form.Item>

                <label>Name <span className='text-red-500'>*</span></label>
                <Form.Item name='name'>
                    <Input className='mb-5' defaultValue={data?.name}></Input>
                </Form.Item>

                <label>Phone number <span className='text-red-500'>*</span></label>
                <Form.Item name='phoneNumber'>
                    <Input className='mb-5' defaultValue={data?.phoneNumber}></Input>
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
                <div className='flex justify-end'>
                    <button type='submit' className='px-8 py-1 mr-2  bg-green-700 rounded hover:text-white'>Update</button>
                    <Button onClick={()=>dispatch({type:CLOSE_DRAWER_CREATE_TASK})} className='border px-4 py-1 rounded hover:!text-red-500 hover:!border-red-500'>Cancel</Button>
                </div>
            </Form>
        </>
    )
}