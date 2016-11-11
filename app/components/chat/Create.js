import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createText } from '../../actions/chat'
import { bindActionCreators } from 'redux'

class Create extends Component {
  constructor (props) {
    super(props)
    this.state = { msg: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state.msg) return
    this.props.createText(this.state.msg, this.props.game)
              .then(this.clearValues())
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearValues () {
    this.setState({msg: ''})
  }

  render () {
    return (
      <div className='ss-chat'>
        <form onSubmit={this.handleSubmit} className='chat'>
          <input
            type='text'
            name='msg'
            value={this.state.msg}
            onChange={this.handleChange}
            placeholder='Type a message' />
          <button type='submit'
            className='btn success'>
            Send
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.selected,
    players: state.games.selected.players
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ createText }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
