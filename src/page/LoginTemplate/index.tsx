import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actLogin } from './duck/action'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';


type Props = {}

export default function ({ }: Props) {
  const dispatch: any = useDispatch()
  const navigate: any = useNavigate()
  const { error,data } = useSelector((state: any) => state.loginReducer)
  const [state, setState] = useState({
    email: '',
    passWord: ''
  })
  const handleValue = (e: any) => {
    let { value, name } = e.target

    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    dispatch(actLogin(state, navigate))
  }
  const user = localStorage.getItem('user') === null ? -1 : localStorage.getItem('user')
  const myProfile = user === -1 ? -1 : JSON.parse(user || '')
  if (myProfile !== -1) return <Navigate to="/" replace={true} />

  return (
    <section className="bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Jira by Cybersoft
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={(event) => handleSubmit(event)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your e-mail</label>
                <input
                  onChange={(e) => handleValue(e)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  onChange={(e) => handleValue(e)}
                  type="password"
                  name="passWord"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
              {error && <div className='text-red-500'>{error?.response.data.message}</div>}

                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full  text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <NavLink to='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create account</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}