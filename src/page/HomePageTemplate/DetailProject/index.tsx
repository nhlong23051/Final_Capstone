import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Input, MenuProps, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { actAssignUserProject, actDetailProject, actGetAllUser, actGetUserByProject, actRemoveUserFromProject, actSearchUserName } from './duck/action';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import DragDropCpn from './DragDropCpn';


type Props = {

}

export default function DetailProject({ }: Props) {
  const [addUser, setAddUser] = useState(false)
  const dispatch: any = useDispatch()
  const param = useParams()
  let { data, loading, keyWord, userByProject, user } = useSelector((state: any) => state.detailProjectReducer)

  useEffect(() => {
    dispatch(actGetAllUser())
    dispatch(actDetailProject(param.id))
    dispatch(actGetUserByProject(param.id))
  }, [])


  // ---------------------filter get all user add ---------------------------
  user = user?.filter((a: any) => data?.members.filter((b: any) => a.userId === b.userId).length === 0)

  // ---------------------------search user --------------------------------
  user = user?.filter((n: any) => n.name.toLowerCase().indexOf(keyWord) !== -1)

  // ------------------ Modal Add User ---------------------
  const openModalAddUser = () => {
    setAddUser(true)
  }

  const closeModalAddUser = () => {
    setAddUser(false)
  }

  return (
    <>
      <div >
        <div className='pl-2 lg:text-center text-2xl py-3'>Project: {data?.projectName}</div>
        <div className='pl-2 lg:pl-40 text-xl'>
          <span>Members: </span>
          {data?.members.slice(0, 5).map((user: any, index: any) => {
            const items: MenuProps['items'] = [
              {
                key: '1',
                label: (
                  <div key={index}>{user.name}</div>
                ),
              }]
            return <>
              <Dropdown menu={{ items }} >
                <Avatar className='cursor-pointer hover:bg-gray-400' src={user.avatar} alt='' onClick={() => {
                  openModalAddUser()
                  dispatch(actGetAllUser())
                  dispatch(actGetUserByProject(param.id))
                }} ></Avatar>
              </Dropdown>
            </>
          })}
          <Avatar className='cursor-pointer hover:bg-gray-400' onClick={() => {
            openModalAddUser()
            dispatch(actGetAllUser())
            dispatch(actGetUserByProject(param.id))
          }}>+</Avatar>
        </div>

        <DragDropCpn colums={data?.lstTask} />
      </div>

      <Modal className='w-full lg:!w-3/4' title='Add members to project Long' onCancel={closeModalAddUser} open={addUser} footer={[]}>
        <Input placeholder='search name ...' className='mb-3' onChange={(e) => {
          dispatch(actSearchUserName(e.target.value))
        }} />
        <div className='lg:grid lg:grid-cols-2'>
          <div className='max-h-80 border border-gray-400 rounded-lg mb-2 p-2 mx-3 lg:p-3 lg:max-h-full '>
            <p className='text-base lg:pb-3'>Not yet added</p>
            <hr />
            <div className='overflow-y-auto h-64 lg:h-96'>
              {user?.map((user: any, index: any) => {
                return <div className='border border-gray-400 p-2 m-2 rounded flex justify-between items-center'>
                  <div className='flex items-center ' >
                    <span>
                      <Avatar className='mr-2' src={user.avatar} alt=''></Avatar>
                    </span>
                    <div className='' >
                      <div className='max-w-28 lg:w-full'>{user.name}</div>
                      <div>User ID: {user.userId}</div>
                    </div>
                  </div>
                  <div>
                    <Button className='bg-blue-400 hover:!text-white' key={index} onClick={() => {
                      dispatch(actAssignUserProject(data?.id, Number(user.userId)))

                    }}>Add</Button>
                  </div>
                </div>
              })}

            </div>
          </div>


          <div className='max-h-64 border border-gray-400 rounded-lg p-2 mx-3 lg:p-3 lg:max-h-full'>
            <p className='text-base lg:pb-3'>Already in project</p>
            <hr />
            <div className='overflow-y-auto h-52 lg:h-96'>
              {userByProject?.map((user: any, index: any) => {
                return <div className='border border-gray-400 p-2 m-2 rounded flex justify-between items-center'>
                  <div className='flex items-center'>
                    <span>
                      <Avatar className='mr-2' src={user.avatar} alt='' > </Avatar>
                    </span>
                    <div>
                      <div className='max-w-28 lg:w-full' >{user.name}</div>
                      <div>User ID: {user.userId} </div>
                    </div>
                  </div>
                  <div>
                    <Button className='bg-red-400 hover:!text-white' key={index} onClick={() => {
                      dispatch(actRemoveUserFromProject(data?.id, user.userId))
                    }}>Remove</Button>
                  </div>
                </div>
              })}

            </div>
          </div>

        </div>

      </Modal >
    </>

  )

};
