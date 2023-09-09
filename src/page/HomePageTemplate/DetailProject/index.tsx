import React, { useEffect, useState, useMemo } from 'react'
import { initialData } from './initialData';
import Colum from './Colum';
import { DragDropContext } from 'react-beautiful-dnd'
import { Avatar, Button, Dropdown, Input, MenuProps, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { actAssignUserProject, actDetailProject, actFetchListStatus, actGetAllUser, actGetUserByProject, actRemoveUserFromProject, actUpdateStatus, actSearchUserName } from './duck/action';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';


type Props = {

}

export default function DetailProject({ }: Props) {
  // const [state, setState] = useState(initialData)
  const [addUser, setAddUser] = useState(false)
  const dispatch: any = useDispatch()
  const param = useParams()
  let { data, loading, keyWord, userByProject, user } = useSelector((state: any) => state.detailProjectReducer)


  useEffect(() => {
    // dispatch(actFetchListStatus())
    // dispatch(actGetAllUser())
    dispatch(actDetailProject(param.id))
    // dispatch(actGetUserByProject(param.id))
  }, [])
  console.log(data);

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


  // ---------------------beautiful dnd ---------------------
  const onDragEnd = (result: any) => {
    // let { destination, source, draggableId } = result
    // // destination là colum sau khi di chuyển đến 
    // // source là colum đang đứng
    // // draggableId là Id của task dc di chuyển 

    // if (!destination) {
    //   return
    // }

    // if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //   return
    // }

    // const start = data?.lstTask.find((a: any) => a.statusId === source.droppableId)
    // const finish = data?.lstTask.find((a: any) => a.statusId === destination.droppableId)

    // // const newTaskId = Array.from(start.lstTaskDeTail)
    // dispatch(actUpdateStatus(draggableId, finish.statusId))


    // const start = state.colums[source.droppableId]
    // const finish = state.colums[destination.droppableId]

    // if (start === finish) {

    //   const newTaskId = Array.from(start.taskIds)
    //   newTaskId.splice(source.index, 1)
    //   newTaskId.splice(destination.index, 0, draggableId)

    //   const newColum = {
    //     ...start,
    //     taskIds: newTaskId
    //   }

    //   const newState = {
    //     ...state,
    //     colums: {
    //       ...state.colums,
    //       [newColum.id]: newColum
    //     }
    //   }

    //   setState(newState)
    //   return
    // }

    // const startTaskIds = Array.from(start.taskIds)
    // startTaskIds.splice(source.index, 1)
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds
    // }

    // const finishTaskIds = Array.from(finish.taskIds)
    // finishTaskIds.splice(destination.index, 0, draggableId)
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds
    // }

    // const newState = {
    //   ...state,
    //   colums: {
    //     ...state.colums,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish
    //   }
    // }
    // setState(newState)
  }

  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className='text-center text-2xl py-3'>Project: {data?.projectName}</div>
        <div className='pl-40 text-xl'>
          <span>Members: </span>
          {data?.members.map((user: any, index: any) => {
            const items: MenuProps['items'] = [
              {
                key: '1',
                label: (
                  <div>{user.name}</div>
                ),
              }]
            return <>
              <Dropdown menu={{ items }} key={index} >
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
        <div className='grid grid-cols-4 pt-4 gap-5 mx-10'>
          {/* {data?.lstTask.map((item: any) => {
            return <Colum key={item.statusId} colum={item} tasks={item.lstTaskDeTail} />
          })} */}
        </div>
      </DragDropContext>

      <Modal className='!w-2/4' title='Add members to project Long' onCancel={closeModalAddUser} open={addUser} footer={[]}>
        <Input placeholder='search name ...' className='mb-3' onChange={(e) => {
          dispatch(actSearchUserName(e.target.value))
        }} />
        <div className='grid grid-cols-2'>
          <div className='border border-gray-400 rounded-lg p-3 mx-3'>
            <p className='text-base pb-3'>Not yet added</p>
            <hr />
            <div className='overflow-y-auto h-96'>
              {user?.map((user: any, index: any) => {
                return <div className='border border-gray-400 p-2 m-2 rounded flex justify-between items-center'>
                  <div className='flex items-center'>
                    <span>
                      <Avatar className='mr-2' src={user.avatar} alt='' ></Avatar>
                    </span>
                    <div>
                      <div>{user.name}</div>
                      <div>User ID: {user.userId}</div>
                    </div>
                  </div>
                  <div>
                    <Button className='bg-blue-400 hover:!text-white' onClick={() => {
                      dispatch(actAssignUserProject(data?.id, Number(user.userId)))

                    }}>Add</Button>
                  </div>
                </div>
              })}

            </div>
          </div>


          <div className='border border-gray-400 rounded-lg p-3 mx-3'>
            <p className='text-base pb-3'>Already in project</p>
            <hr />
            <div className='overflow-y-auto h-96'>
              {userByProject?.map((user: any, index: any) => {
                return <div className='border border-gray-400 p-2 m-2 rounded flex justify-between items-center'>
                  <div className='flex items-center'>
                    <span>
                      <Avatar className='mr-2' src={user.avatar} alt=''> </Avatar>
                    </span>
                    <div>
                      <div>{user.name}</div>
                      <div>User ID: {user.userId} </div>
                    </div>
                  </div>
                  <div>
                    <Button className='bg-red-400 hover:!text-white' onClick={() => {
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
