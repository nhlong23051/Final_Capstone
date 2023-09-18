import React, { ReactNode, useEffect, useState } from 'react'
import { Avatar, Button, Layout, List, Modal, Pagination, Popover, Space, Table, Tag } from 'antd';
import { DataType, InitialState } from '../duck/types';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteProject, actFetchListAllProject } from '../duck/action';
import { NavLink } from 'react-router-dom';
import CreateTask from '../../CreateTask';
import { OPEN_DRAWER_CREATE_TASK } from '../../CreateTask/duck/const';
import { EditOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons';

type Props = {

}

const { Column, ColumnGroup } = Table;

export default function ContentProject({ }: Props) {
  const dispatch: any = useDispatch()
  let { loading, data, keyWord } = useSelector((state: any) => state.getAllProductReducer)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [idProjectDelete, setIdProjectDelete] = useState(0)


  useEffect(() => {
    dispatch(actFetchListAllProject())
  }, [])

  keyWord = keyWord.toLowerCase()
  data = data?.filter((project: any) => project.projectName.toLowerCase().indexOf(keyWord) !== -1)

  const handleChange = (value: any) => {
    console.log(value);
  }

  const handleConfirm = (id: any) => {
    setConfirmDelete(true)
    setIdProjectDelete(id)
  }

  return (
    <>
      < Table dataSource={data} className='hidden w-full md:inline-block'  >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Project Name"
          dataIndex="projectName"
          key="projectName"
          width={20}
          render={(name, record: any) => <NavLink to={`/project/${record.id}`} className='text-blue-500'>{name}</NavLink>} />
        <Column title="Category Name" dataIndex="categoryName" key="categoryName" />
        <Column
          title="Creator"
          dataIndex="creator"
          key="creator"
          render={(creator: any) => <Tag color='red'>{creator.name}</Tag>}
        />
        <Column
          title="members"
          dataIndex="members"
          key="members"

          render={(members: string[]) => (
            <>
              {members.slice(0, 3).map((member: any, index) => (
                <Avatar key={index} src={member.avatar} alt=''></Avatar>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"

          render={(_: any, record: DataType) => (
            <>
              <Popover placement="left" className='bg-blue-400' title={'Setting'} content={() => <>

                <Button onClick={() => {
                  dispatch({ type: OPEN_DRAWER_CREATE_TASK, payload: <CreateTask projectId={record.id} /> })
                }} > Create task</Button>

                <Button className='block mt-2' >
                  <NavLink to={`/edit-project/${record.id}`}>Update</NavLink>
                </Button>

              </>} trigger="click">

                <Button className='w-auto'>
                  <EditOutlined className='pb-2 mr-1' />
                  <div className='hidden lg:inline-block'>Setting</div>
                </Button>
              </Popover>

              <Button onClick={() => handleConfirm(record.id)} className='bg-red-500 mx-1 md:mx-0' size="middle">
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
        renderItem={(project: any) => {
          return <div className='border-b-2' key={project.id}>
            <div className='grid grid-cols-2 items-center justify-center my-2'>
              <div className=''>Id</div>
              <div className='text-center'>{project.id}</div>
            </div>
            <div className='grid grid-cols-2 items-center justify-center my-2'>
              <div className=''>Project name</div>
              <NavLink to={`/project/${project.id}`} className='text-center text-blue-500'>{project.projectName}</NavLink>
            </div>
            <div className='grid grid-cols-2 items-center justify-center my-2'>
              <div className=''>Category name</div>
              <div className='text-center'>{project.categoryName}</div>
            </div>
            <div className='grid grid-cols-2 items-center justify-center my-2'>
              <div className=''>Creator</div>
              <div className='text-center'>{project.creator.name}</div>
            </div>

            <div className='grid grid-cols-2 items-center justify-center my-2'>
              <div className=''>member</div>
              <div className='text-center'>{project.members.slice(0, 3).map((member: any) => {
                return <Avatar src={member.avatar} alt='' />
              })}</div>
            </div>

            <div className='grid grid-cols-2 items-center justify-center my-2'>
              <div className=''>Action</div>
              <div className='text-center'>
                <NavLink to={`/edit-project/${project.id}`}>
                  <EditOutlined className='bg-blue-400 rounded p-3 pb-2 mr-1 md:ml-1 hover:bg-gray-300' />
                </NavLink>
                <DeleteOutlined onClick={() => handleConfirm(project.id)} className='bg-red-500 rounded p-3 pb-2 mr-1 md:mr-0 hover:bg-gray-300' />
              </div>
            </div>

          </div>
        }}
      >
      </List >

      <Modal open={confirmDelete} onCancel={() => setConfirmDelete(false)} footer={[
        <div className=''>
          <Button className='bg-red-600 mr-1' onClick={() => {
            dispatch(actDeleteProject(idProjectDelete))
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