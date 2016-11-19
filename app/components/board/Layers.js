import React from 'react'

const Layers = () => {
  return (
    <div>
      <div className='background layer-0' />
      <div className='character-wrap'>
        <div className='character player-1' />
        <div className='character player-2' />
      </div>
      <div className='background layer-2' />
    </div>
  )
}

export default Layers
