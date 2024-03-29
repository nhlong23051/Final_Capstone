import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
import { Editor } from '@tinymce/tinymce-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actCreateProject } from './duck/action';
import { toast } from 'react-toastify';


type Props = {}

export default function CreateProject({ }: Props) {
    const editorRef: any = useRef(null);
    const dispatch: any = useDispatch()
    const navigate: any = useNavigate()
    const { loadding, error } = useSelector((state: any) => state.createProjectReducer)

    let createProject = {}
    const handleFinish = (values: any) => {
        let { projectName, categoryId } = values
        let description = editorRef.current.getContent()
        createProject = { ...createProject, projectName, categoryId, description }
        dispatch(actCreateProject(createProject, navigate))
    }

    return (
        <>
            <p className='text-2xl w-auto text-center md:text-center md:text-4xl py-4'>Create Project</p>
            <Form onFinish={handleFinish} className='px-2 md:px-48'>
                <div>
                    <label className='' >Project name<span className='text-red-500'>*</span></label>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input your project name!',
                            },
                        ]}
                        name='projectName'>
                        <Input></Input>
                    </Form.Item>
                </div>

                <div>
                    <label className='' >Project category<span className='text-red-500'>*</span></label>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please choose category!',
                            },
                        ]}
                        name='categoryId'>
                        <Select
                            style={{ width: '100%' }}
                            options={[
                                { label: 'Dự án web', value: '1' },
                                { label: 'Dự án phần mềm', value: '2' },
                                { label: 'Dự án di động', value: '3' },
                            ]}
                        />
                    </Form.Item>
                </div>

                <div>
                    <label className='' >Descriptions</label>
                    <Form.Item >
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
                    {error && <div className='text-red-500 text-xl'>{error?.response?.data?.message}</div>}
                    </Form.Item>
                </div>

                <div>
                    <button type='submit'
                        className='bg-blue-500 mr-2 py-2 px-3 rounded hover:text-white'>Create</button>
                    <NavLink to='/' className='bg-gray-300 mr-2 py-2 px-3 rounded  hover:text-white'>Cancel</NavLink>
                </div>
            </Form >
        </>
    )
}