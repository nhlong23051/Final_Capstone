import React, { ReactNode, useEffect, useState } from 'react'
import { Avatar, Button, Modal, Popover, Space, Table, Tag } from 'antd';
import { DataType, InitialState } from '../duck/types';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteProject, actFetchListAllProject } from '../duck/action';
import { NavLink } from 'react-router-dom';
import CreateTask from '../../CreateTask';
import EditProject from '../../EditProject';
import { OPEN_DRAWER_CREATE_TASK } from '../../CreateTask/duck/const';
import { actGetInfoProject } from '../../EditProject/duck/action';

type Props = {

}

const { Column, ColumnGroup } = Table;

export default function ContentProject({ }: Props) {
  const dispatch: any = useDispatch()
  let { loading, data, keyWord } = useSelector((state: any) => state.getAllProductReducer)
  const [modalCreateTask, setModalCreateTask] = useState(false)
  useEffect(() => {
    dispatch(actFetchListAllProject())
  }, [])

  keyWord = keyWord.toLowerCase()
  data = data?.filter((project: any) => project.projectName.toLowerCase().indexOf(keyWord) !== -1)

  return (
    <>
      < Table dataSource={data} >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Project Name"
          dataIndex="projectName"
          key="projectName"
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
              <Avatar className='cursor-pointer hover:bg-gray-400'>+</Avatar>
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
                  dispatch({ type: OPEN_DRAWER_CREATE_TASK, payload: <CreateTask defaultNameProject={record.projectName} /> })
                }} >Create task</Button>
                <Button  className='block mt-2'>
                  <NavLink to={`/edit-project/${record.id}`}>Edit</NavLink>
                </Button>
              </>} trigger="click">
                <Button>Setting</Button>
              </Popover>

              <Button onClick={() => dispatch(actDeleteProject(record.id))} className='bg-red-500 mx-2' size="middle">
                <a>Delete </a>
              </Button>

            </>
          )}
        />
      </Table >

    </>
  )
}