import { Avatar, Button, List, Modal, Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteUser, actFetchListAllUser } from '../duck/action'
import { EditOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons';
import FormEditUser from './formEditUser'
import { OPEN_DRAWER_CREATE_TASK } from '../../CreateTask/duck/const'

type Props = {}

export default function ContentUser({ }: Props) {
    const dispatch: any = useDispatch()
    let { loading, data, keyWord } = useSelector((state: any) => state.getAllUserReducer)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [idUserDelete, setIdUserDelete] = useState(0)


    useEffect(() => {
        dispatch(actFetchListAllUser())
    }, [])

    keyWord = keyWord.toLowerCase()

    const handleConfirm = (id: any) => {
        console.log('id', id);

        setConfirmDelete(true)
        setIdUserDelete(id)
    }

    data = data?.filter((user: any) => user.name.toLowerCase().indexOf(keyWord) !== -1)
    return (
        <>
            < Table dataSource={data} className='hidden w-full md:inline-block' >
                <Column title="UserID" dataIndex="userId" key="userId" />
                <Column title="User name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Phone number" dataIndex="phoneNumber" key="phoneNumber" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: any) => (
                        <>
                            <Button className=' bg-blue-400' size="middle" onClick={() => dispatch({ type: OPEN_DRAWER_CREATE_TASK, payload: <FormEditUser data={record} /> })} >
                                <EditOutlined className='pb-2 mr-1' />
                                <div className='hidden lg:inline-block'>Update </div>
                            </Button>
                            <Button className='bg-red-500 mx-2' size="middle" onClick={() => handleConfirm(record.userId)}>
                                <DeleteOutlined className='pb-2 mr-1' />
                                <div className='hidden lg:inline-block'>Delete </div>
                            </Button>
                        </>
                    )}
                />
            </Table >

            <List
                dataSource={data}
                pagination={{ position: 'bottom', align: 'center' }}
                className=' md:hidden'
                renderItem={(user: any) => {
                    return <div className='border-b-2' key={user.userId}>
                        <div className='grid grid-cols-2 items-center justify-center my-2'>
                            <div className=''>User Id</div>
                            <div className='text-center'>{user.id}</div>
                        </div>
                        <div className='grid grid-cols-2 items-center justify-center my-2'>
                            <div className=''>User name</div>
                            <div >{user.name}</div>
                        </div>
                        <div className='grid grid-cols-2 items-center justify-center my-2'>
                            <div className=''>Email</div>
                            <div className='text-center'>{user.email}</div>
                        </div>
                        <div className='grid grid-cols-2 items-center justify-center my-2'>
                            <div className=''>Phone number</div>
                            <div className='text-center'>{user.phoneNumber}</div>
                        </div>
                        <div className='grid grid-cols-2 items-center justify-center my-2'>
                            <div className=''>Action</div>
                            <div className='text-center'>
                                <EditOutlined onClick={() =>
                                    dispatch({ type: OPEN_DRAWER_CREATE_TASK, payload: <FormEditUser data={user} /> })}
                                    className='bg-blue-400 rounded p-3 pb-2 mr-1 hover:bg-gray-300' />

                                <DeleteOutlined onClick={() => handleConfirm(user.userId)} className='bg-red-500 rounded p-3 pb-2 mr-1 hover:bg-gray-300' />
                            </div>
                        </div>

                    </div>
                }}
            >
            </List >

            <Modal open={confirmDelete} onCancel={() => setConfirmDelete(false)} footer={[
                <div className=''>
                    <Button className='bg-red-600 mr-1' onClick={() => {
                        dispatch(actDeleteUser(idUserDelete))
                        setConfirmDelete(false)
                    }} >Yes</Button>
                    <Button onClick={() => setConfirmDelete(false)}>No</Button>
                </div>
            ]}>
                <div className='h-auto'>
                    <div className='text-xl'>
                        <WarningOutlined className='pb-2 mr-2 text-yellow-400' /> Are you sure to delete this user?
                    </div>
                </div>
            </Modal>
        </>
    )
}