import React from 'react'
import List from './List'
import Create from './Create'

const Container = () => (
  <div className='ss-game'>
    <div className='lobby'>
      <Create />
      <List />
    </div>
  </div>
)

export default Container
