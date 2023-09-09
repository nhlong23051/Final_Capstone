import { Col, Form, Input, InputNumber, Modal, Row, Select, SelectProps, Slider, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { actCreateTask, actGetAllProjects, actGetAllUser } from './duck/action';
import { CLOSE_DRAWER_CREATE_TASK } from './duck/const';

type Props = {
    defaultNameProject?: string
}

export default function CreateTask({ defaultNameProject }: Props) {
    const dispatch: any = useDispatch()
    let { users, projects } = useSelector((state: any) => state.modalCreateTaskReducer)
    const editorRef: any = useRef(null);

    const projectAll: any = []
    projects?.map((project: any, index: any) => {
        projectAll.push({
            key: index,
            label: project.projectName,
            value: project.id
        })
    })

    useEffect(() => {
        dispatch(actGetAllUser())
        dispatch(actGetAllProjects())
    }, [])

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const handleValue = (values: any) => {
        let description = editorRef.current.getContent()
        values = { ...values, description }

        dispatch(actCreateTask(values))
    }

    return (
        <>
            <div className='text-center text-xl'>Create task</div>
            <Form onFinish={handleValue}>
                <div>
                    <label className='' >Project<span className='text-red-500'>*</span></label>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please choose Project!',
                            },
                        ]}
                        name='projectId'>
                        <Select
                            style={{ width: '100%' }}
                            defaultValue={defaultNameProject}
                            options={projectAll}
                            allowClear
                        />
                    </Form.Item>
                </div>
                <div>
                    <label className='' >Task name</label>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input your task name!',
                            },
                        ]}
                        name='taskName'>
                        <Input></Input>
                    </Form.Item>
                </div>

                <div>
                    <label className='' >Status</label>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please choose category!',
                            },
                        ]}
                        name='statusId'>
                        <Select
                            style={{ width: '100%' }}
                            options={[
                                { label: 'BACKLOG', value: '1' },
                                { label: 'SELECTED FOR DEVELOPMENT', value: '2' },
                                { label: 'IN PROGRESS', value: '3' },
                                { label: 'DONE', value: '4' },
                            ]}
                        />
                    </Form.Item>
                </div>

                <div className='grid grid-cols-2 '>
                    <div>
                        <label className='' >Priority</label>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose category!',
                                },
                            ]}
                            name='priorityId'>
                            <Select
                                style={{ width: '90%' }}
                                options={[
                                    { label: 'High', value: 1 },
                                    { label: 'Medium', value: 2 },
                                    { label: 'Low', value: 3 },
                                    { label: 'Lowest', value: 4 },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <div className='relative right-0'>
                        <label className='' >Task Type</label>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose category!',
                                },
                            ]}
                            name='typeId'>
                            <Select
                                style={{ width: '90%' }}
                                options={[
                                    { label: 'Bug', value: 1 },
                                    { label: 'New task', value: 2 },
                                ]}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div>
                    <div>
                        <label>Assigners</label>
                        <Form.Item name='listUserAsign'>
                            <Select
                                mode="multiple"
                                allowClear
                                onChange={handleChange}
                                filterOption={(input: string, options: any) => (options?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                style={{ width: '100%' }}
                                placeholder="Please select Assigners"
                                options={users?.map((user: any, index: any) => ({
                                    label: user.name,
                                    value: user.userId,
                                    index: index
                                }))}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className='grid grid-cols-2 pt-5'>
                    <div className='w-3/4'>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input timeTrackingRemaining!',
                                },
                            ]}
                            name='timeTrackingRemaining'>
                            <Input type='number'></Input>
                        </Form.Item>
                    </div>

                    <div className='w-3/4'>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input timeTrackingSpent!',
                                },
                            ]}
                            name='timeTrackingSpent'>
                            <Input type='number'></Input>
                        </Form.Item>
                    </div>
                </div>

                <div>
                    <label className='' >Descriptions</label>
                    <Form.Item name='description' >
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        {/* {error && <div className='text-red-500 text-xl'>{error?.response?.data?.message}</div>} */}
                    </Form.Item>
                </div>
                <div>
                    <button type='submit' className='bg-blue-500 mr-2 py-2 px-3 rounded hover:text-white'>Create</button>
                    <button onClick={() => dispatch({ type: CLOSE_DRAWER_CREATE_TASK })} className='bg-gray-300 mr-2 py-2 px-3 rounded  hover:text-white'>Cancel</button>
                </div>
            </Form>
        </>
    )
}