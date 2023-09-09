import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actEditProject, actGetInfoProject } from './duck/action';
import { useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';

type Props = {}

export default function EditProject({ }: Props) {
  const dispatch: any = useDispatch()
  const params: any = useParams()
  const editorRef: any = useRef(null);

  useEffect(() => {
    dispatch(actGetInfoProject(params.id))
  }, [])

  let { infoProject, loading } = useSelector((state: any) => state.editProjectReducer)
  const categoryId = infoProject?.projectCategory.id.toString()

  

  let [state, setState] = useState({
    id: infoProject?.id,
    projectName: infoProject?.projectName,
    creator: infoProject?.creator.id,
    categoryId: infoProject?.projectCategory.id.toString(),
    description: infoProject?.description,
  })

  const handleValue = (e: any) => {
    let { name, value } = e.target
    infoProject = { ...infoProject, [name]: value }
    // setState({
    //   ...state,
    //   [name]: value
    // })
    console.log('state', state);
  }

  const handleFinish = (e: any) => {
    e.preventDefault()
    let descValue = editorRef.current.getContent()
    // setState({
    //   ...state,
    //   projectName: infoProject?.projectName,
    //   creator: infoProject?.creator.id,
    //   categoryId: infoProject?.projectCategory.id.toString(),
    //   id: infoProject?.id,
    //   description: descValue,
    // })
    infoProject = { ...infoProject, description: descValue }
    console.log('project', infoProject);

    // dispatch(actEditProject(infoProject, params.id))
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  // console.log('state', state);
  console.log('infoProject', infoProject);

  return (
    <>
      <p className='text-center text-4xl py-4'>Create Project</p>

      <form onSubmit={(e) => handleFinish(e)} className='px-60' >

        <div className='py-1'>
          <label className='' >ID<span className='text-red-500'>*</span></label>
          <input className='w-full p-2' disabled value={infoProject?.id}></input>
        </div>


        <div className='py-1'>
          <label className='' >Project name<span className='text-red-500'>*</span></label>
          <input className='w-full  p-2' name='projectName' defaultValue={infoProject?.projectName} onChange={(e) => handleValue(e)} ></input>
        </div>

        <div className='py-1'>
          <label className='w-full' >Project category<span className='text-red-500'>*</span></label>
          <select name='categoryId' className='w-full  p-2' defaultValue={`${categoryId}`} onChange={(e) => handleValue(e)} >
            <option key='1' value='1'>Dự án web</option>
            <option key='2' value='2'>Dự án phần mềm</option>
            <option key='3' value='3'>Dự án di động</option>
          </select>
          {/* <Select
            style={{ width: '100%' }}
            defaultValue={`${infoProject?.projectCategory.id}` || ''}
            onChange={handleChange}
            options={[
              { value: '1', label: 'Dự án web' },
              { value: '2', label: 'Dự án phần mềm' },
              { value: '3', label: 'Dự án di động' },
            ]}
          /> */}
        </div>

        {/* <div>
          <label className='' >Descriptions</label>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={infoProject?.description}
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
        </div> */}

        <div>
          <button type='submit'
            className='bg-blue-500 mr-2 py-2 px-3 rounded hover:text-white'>Update</button>
          <button className='bg-gray-300 mr-2 py-2 px-3 rounded  hover:text-white'>Cancel</button>
        </div>
      </form >

      {/* <Form onFinish={handleFinish} className='px-60' >
        <div>
          <label className='' >ID<span className='text-red-500'>*</span></label>
          <Form.Item

            name='id'>
            <Input value={infoProject?.id} disabled></Input>
          </Form.Item>
        </div>

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
            <Input defaultValue={infoProject?.projectName}></Input>
          </Form.Item>
        </div>

        <div>
          <label className='' >Project category<span className='text-red-500'>*</span></label>
          <Form.Item
            name='categoryId'>
            <Select
              style={{ width: '100%' }}
              defaultValue={`${categoryId}`}
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
              initialValue={infoProject?.description}
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
          </Form.Item>
        </div>

        <div>
          <button type='submit'
            className='bg-blue-500 mr-2 py-2 px-3 rounded hover:text-white'>Update</button>
          <button className='bg-gray-300 mr-2 py-2 px-3 rounded  hover:text-white'>Cancel</button>
        </div>
      </Form > */}
    </>
  )
}