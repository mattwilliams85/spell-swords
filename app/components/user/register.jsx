import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser, loginWithProvider } from '../../actions/auth'

class UserRegister extends Component {
  constructor (props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      message: ''
    }
  }

  onFormSubmit (event) {
    event.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value
    const displayName = this.refs.displayName.value
    this.props.registerUser({ email, password, displayName }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage })
      } else {
        browserHistory.push('/')
      }
    })
  }

  render () {
    return (
      <div className='layout-padding'>
        <form id='frmRegister' role='form' onSubmit={this.onFormSubmit}>
          <p>{this.state.message}</p>
          <h2>Register</h2>
          <div className='form-group'>
            <label htmlFor='txtRegEmail'>Display Name</label>
            <input type='text' className='form-control' ref='displayName' id='txtEmail' placeholder='Enter Display Name'
              name='displayName' pattern='.{3,13}' title='3 to 13 characters' required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='txtRegEmail'>Email address</label>
            <input type='email' className='form-control' ref='email' id='txtEmail' placeholder='Enter email'
              name='email' required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='txtRegPass'>Password</label>
            <input type='password' className='form-control' ref='password' id='txtPass' placeholder='Password'
              name='password' required
            />
          </div>
          <button type='submit' className='btn btn-primary'>Register</button>
          <br /> <br />

          <a href='#' className='btn btn-block btn-social btn-facebook' onClick={() => {
            this.props.loginWithProvider('facebook')
          }} data-provider='facebook'
          >Facebook</a>

          <a href='#' className='btn btn-block btn-social btn-twitter' onClick={() => {
            this.props.loginWithProvider('twitter')
          }} data-provider='twitter'
          >Twitter</a>

          <a href='#' className='btn btn-block btn-social btn-google' onClick={() => {
            this.props.loginWithProvider('google')
          }} data-provider='twitter'
          >Google</a>

          <a href='#' className='btn btn-block btn-social btn-github' onClick={() => {
            this.props.loginWithProvider('github')
          }} data-provider='twitter'
          >Github</a>

        </form>
      </div>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    registerUser,
    loginWithProvider
  }, dispatch)
}

function mapStateToProps (state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister)
