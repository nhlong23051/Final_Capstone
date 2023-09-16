import { Editor } from '@tinymce/tinymce-react'
import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actUpdateDescription } from './duck/action'
import HTMLReactParser from 'html-react-parser';

type Props = {
    data: any
}

export default function UpdateDescription({ data }: Props) {
    const dispatch: any = useDispatch()
    const editorRef: any = useRef(null);
    let [formDesc, setFormDesc] = useState(false)
    let [state, setState] = useState('')
    
    useEffect(() => {
        setState(data?.description)
    }, [data?.description])

    const handleChange = (e: any) => {
        let { content } = e.level
        content = HTMLReactParser(content)
        setState(content)
    }

    const handleSubmit = () => {
        data = { ...data, description: state }
        dispatch(actUpdateDescription(data))
        setFormDesc(false)
    }

    return (
        <div className='mb-1'>
            <div className='mb-1 text-base font-bold' >Descriptions</div>
            {formDesc ?
                <>
                    <Editor
                        initialValue={state}
                        onChange={(e) => handleChange(e)}
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
                    <Button className='mt-1' onClick={handleSubmit} >Save</Button>
                    <Button className='mx-2 bg-red-300 hover:!text-white' onClick={() => setFormDesc(false)}>Cancel</Button>
                </> :
                <div className='py-1 cursor-pointer px-3 text-xl rounded items-center justify-center hover:bg-gray-300 hover:transition duration-300 hover:!text-black' onClick={() => setFormDesc(true)}>{data?.description === '' ? 'Add a description...' : `${data?.description}`}</div>
            }
        </div>
    )
}