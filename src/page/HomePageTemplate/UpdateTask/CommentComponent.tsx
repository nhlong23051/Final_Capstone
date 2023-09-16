import { Avatar, Button, Form, Input, Modal, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RightOutlined, WarningOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { actDeleteComment, actEditComment, actInsertComment } from './duck/action';

type Props = {
    data: any
}

export default function CommentComponent({ data }: Props) {
    const dispatch: any = useDispatch()
    const myInfo = JSON.parse(localStorage.getItem('user') || '')

    const [comment, setComment] = useState('')
    const [state, setState] = useState(data)

    const [formConfirm, setFormConfirm] = useState(false)
    const [deleteCmt, setDeleteCmt] = useState({})

    const [formEditCmt, setFormEditCmt] = useState(false)
    const [editCmt, setEditCmt] = useState({ id: 0, contentComment: '', taskId: 0 })

    useEffect(() => {
        setState(data)
    }, [data?.lstComment])

    const handValue = (e: any) => {
        let { value, name } = e.target
        setState({
            ...data, [name]: value
        })
        setComment(value)
    }


    const handleSubmit = (event: any) => {
        event.preventDefault()
        dispatch(actInsertComment(state))
        setComment('')
    }

    // -----------------Delete Comment----------------------
    const openConfirm = (id: any) => {
        setFormConfirm(true)
        setDeleteCmt({
            ...deleteCmt,
            id,
            taskId: data.taskId
        })
    }

    const handValueEditCmt = (e: any) => {
        let { value, name } = e.target
        setEditCmt({
            ...editCmt,
            [name]: value,
            taskId: data?.taskId
        })
    }
    // -----------------Edit Comment----------------------
    const handleEditComment = (e: any) => {
        e.preventDefault()
        dispatch(actEditComment(editCmt, data.taskId))
        setFormEditCmt(false)
    }

    return (
        <>
            <div className='mb-1 border p-1'>
                <div className='mb-1 text-base font-bold'  >Comments</div>
                <hr />

                <form className='flex my-4' onSubmit={(event) => handleSubmit(event)} >
                    <Avatar className='cursor-pointer' src={myInfo.avatar} alt=''></Avatar>
                    <input
                        value={comment}
                        name='contentComment'
                        onChange={(e) => handValue(e)}
                        className='mx-2 w-3/4 border rounded'
                        placeholder='Add a comment...' />
                    <RightOutlined type='submit' style={{ width: '30px', height: '30px' }} className=' pt-2 rounded-full hover:bg-gray-300 hover:transition duration-300 ' />
                </form>

                {state?.lstComment.map((cmt: any) => {
                    return <div key={cmt.id} className='flex items-center ml-2 mb-2'>
                        
                        <Avatar className='cursor-pointer' src={cmt?.avatar} alt=''></Avatar>
                        <div className='flex justify-between w-full items-center'>
                            <div className='ml-4 w-full border rounded-full px-3 py-1'>
                                <div className='font-medium hover:cursor-pointer hover:text-gray-500'>{cmt?.name}</div>

                                {formEditCmt && cmt.id === editCmt.id ?
                                    <form className='flex' onSubmit={(e) => handleEditComment(e)}>
                                        <input
                                            onChange={(e) => handValueEditCmt(e)}
                                            name='contentComment'
                                            className='rounded w-full border '
                                            autoFocus
                                            value={editCmt.contentComment} />
                                        <RightOutlined
                                            type='submit'
                                            onClick={handleEditComment}
                                            style={{ width: '30px', height: '30px' }}
                                            className=' pt-2 rounded-full hover:bg-gray-300 hover:transition duration-300 ' />
                                    </form>
                                    :
                                    <p className=' rounded p-1 w-full cursor-auto'>
                                        {HTMLReactParser(cmt?.commentContent)}
                                    </p>
                                }
                            </div>

                            <div>
                                <Popover placement="bottom" content={(
                                    <>
                                        <Button className='bg-blue-400 mx-1' onClick={() => {
                                            setFormEditCmt(true)
                                            const v: any = HTMLReactParser(cmt?.commentContent)
                                            setEditCmt({ ...editCmt, id: cmt.id, contentComment: v })
                                        }}>Edit</Button>
                                        <Button className='bg-red-400' onClick={() => openConfirm(cmt?.id)}>Delete</Button>
                                    </>
                                )} trigger="click">
                                    <button className='w-10 rounded-full hover:bg-gray-300 hover:transition duration-300 '>...</button>
                                </Popover>
                            </div>
                        </div>
                    </div>
                })}
            </div >

            {/* -----------------Modal comfirm delete comment---------------------- */}
            <Modal open={formConfirm} onCancel={() => setFormConfirm(false)} footer={[]}>
                <div>
                    <div className='text-2xl flex items-center'>
                        <WarningOutlined className='text-red-700 mx-3' />
                        <div>Delete this comment?</div>
                    </div>
                    <div className='my-2 text-base'>Once you delete, it's gone for good.</div>
                    <Button className='bg-red-400 mr-2' onClick={() => {
                        dispatch(actDeleteComment(deleteCmt))
                        setFormConfirm(false)
                    }}>Delete</Button>
                    <Button onClick={() => setFormConfirm(false)}>Cancel</Button>
                </div>
            </Modal>
        </>
    )
}