import React from 'react'

const Spinner = () => {
  return (
    <div className='ss-loading layout-column layout-align-center-center flex'>
      <div className='folding-cube'>
        <div className='cube1 cube' />
        <div className='cube2 cube' />
        <div className='cube4 cube' />
        <div className='cube3 cube' />
      </div>
      <h5>LOADING...</h5>
    </div>
  )
}

export default Spinner
