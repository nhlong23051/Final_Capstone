import { Layout } from 'antd'
import React from 'react'

type Props = {}

export default function FooterCpn({ }: Props) {

    let { Footer } = Layout

    return (
        <Footer className='fixed w-full text-center bottom-0 h-2 text-lg'>Jira by Cybersoft</Footer>
    )
}