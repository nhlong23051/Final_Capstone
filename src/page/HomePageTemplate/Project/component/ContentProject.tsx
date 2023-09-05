import React, { useEffect } from 'react'
import { Avatar, Button, Popover, Space, Table, Tag } from 'antd';
import { DataType, InitialState } from '../duck/types';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchListAllProject } from '../duck/action';
import { NavLink } from 'react-router-dom';

type Props = {}

const { Column, ColumnGroup } = Table;

export default function ContentProject({ }: Props) {
  const dispatch: any = useDispatch()
  let { loading, data, keyWord } = useSelector((state: any) => state.getAllProductReducer)

  useEffect(() => {
    dispatch(actFetchListAllProject())
  }, [])

  keyWord = keyWord.toLowerCase()
  data = data?.filter((project: any) => project.projectName.toLowerCase().indexOf(keyWord) !== -1)
  return (
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
            <Popover placement="left" className='bg-blue-400' title={'Setting'} content={() => <div>ádasiodh</div>} trigger="click">
              <Button>Setting</Button>
            </Popover>
            <Button className='bg-red-500 mx-2' size="middle">
              <a>Delete </a>
            </Button>
          </>
        )}
      />
    </Table >
  )
}