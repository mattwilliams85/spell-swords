import Board from './Board'
import React, { Component } from 'react'

class Container extends Component {
  render () {
    return (
      <div className='container'>
        <Board gameKey={this.props.params.key} />
      </div>
    )
  }
}

export default Container
