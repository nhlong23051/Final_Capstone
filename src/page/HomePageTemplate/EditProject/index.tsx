import { withFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { actEditProject, actGetInfoProject } from './duck/action';
import { Form, Input, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

type Props = {}

export default function EditProject({ }: Props) {
  const dispatch: any = useDispatch()
  const editorRef: any = useRef(null);
  const params: any = useParams()
  const { infoProject } = useSelector((state: any) => state.editProjectReducer)
  const [state, setState] = useState({
    id: null,
    projectName: null,
    creator: null,
    description: null,
    categoryId: null
  })

  useEffect(() => {
    dispatch(actGetInfoProject(params.id))
  }, [])

  useEffect(() => {
    if (infoProject) {
      setState({
        id: infoProject?.id,
        projectName: infoProject?.projectName,
        creator: infoProject?.creator?.id,
        description: infoProject?.description,
        categoryId: infoProject?.projectCategory?.id.toString()
      })
    }
  }, [infoProject])


  const handleChange = (e: any) => {
    let { name, value } = e.target

    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let description = editorRef.current.getContent()
    setState({
      ...state,
      description
    })
    dispatch(actEditProject(state, params.id))
  }

  console.log('state', state);

  return (
    <>
      <p className='text-2xl text-center md:text-4xl py-4'>Update Project</p>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full px-3 md:px-40'>
        <div className='my-2'>
          <label className='w-full' >ID<span className='text-red-500'>*</span></label>
          <input className='w-full p-2' value={state.id || ''} disabled />
        </div>
        <div className='my-2'>
          <label className='w-full' >Project name<span className='text-red-500'>*</span></label>
          <input className='w-full p-2' name='projectName' value={state.projectName || ''} onChange={(e) => handleChange(e)} />
        </div>

        <div className='my-2'>
          <label className='w-full' >Project category<span className='text-red-500'>*</span></label>

          <select className='w-full p-2' name='categoryId' value={state.categoryId || ''} onChange={(e) => handleChange(e)}>
            <option value='1'>Dự án web</option>
            <option value='2'>Dự án phần mềm</option>
            <option value='3'>Dự án di động</option>
          </select>
        </div>

        <div>
          <label className='' >Descriptions</label>
          <Editor
            initialValue={state.description || ''}
            onInit={(evt, editor) => editorRef.current = editor}
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
        </div>

        <div>
          <button type='submit'
            className='bg-blue-500 mr-2 py-2 px-3 rounded hover:text-white'>Update</button>

          <button className='bg-gray-300 mr-2 py-2 px-3 rounded  hover:text-white'>
            <NavLink to='/'>Cancel</NavLink>
          </button>
        </div>
      </form >
    </>
  )
}