import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Nopage from './Misc/Nopage'
import CreateTodo from './Dashboard/Home/CreateTodo'

const index = () => {
  return (
    <><Routes>
        <Route path='/*' element = {<Frontend/>}/>
        <Route path="/auth/*" element={<Auth />} />
        <Route path='/dashboard/*' element = {<Dashboard/>}/>
        <Route path='*' element = {<Nopage/>}/>
        <Route path="/dashboard/create-todo" element={<CreateTodo />} />
        </Routes></>
  )
}

export default index