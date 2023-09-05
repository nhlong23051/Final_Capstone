import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

export default function Page404({ }: Props) {
    return (
        <>
            <div className='flex items-center justify-center'>
                <img src={require('../../asset/img/b9d306d.png')} alt='' />

            </div>
            <div className='text-center py-4'>
                <NavLink to='/' className='bg-green-500 px-8 py-2 rounded font-sans hover:bg-green-600' >Back Home Page</NavLink>
            </div>
        </>
    )
}