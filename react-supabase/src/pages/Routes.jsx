import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Nopage from './Misc/Nopage'

const index = () => {
  return (
    <><Routes>
        <Route path='/*' element = {<Frontend/>}/>
        <Route path="/auth/*" element={<Auth />} />
        <Route path='/dashboard/*' element = {<Dashboard/>}/>
        <Route path='*' element = {<Nopage/>}/>
        </Routes></>
  )
}

export default index