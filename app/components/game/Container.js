import React from 'react'
import List from './List'
import Create from './Create'

const Container = () => (
  <div className='ss-game layout-column layout-align-center-center'>
    <div className='lobby'>
      <Create />
      <List />
    </div>
  </div>
)

export default Container
