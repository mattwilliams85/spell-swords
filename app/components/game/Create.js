import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGame } from '../../actions/game'
import { bindActionCreators } from 'redux'

class Create extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.createGame(this.state.name)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <button type='submit'
            className='btn red title'>
            <span><i className='mdi mdi-sword' />START NEW GAME!</span>
          </button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ createGame }, dispatch)
}

export default connect(null, mapDispatchToProps)(Create)
