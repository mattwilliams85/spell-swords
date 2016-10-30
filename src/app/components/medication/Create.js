import React from 'react'
import { connect } from 'react-redux'
import { createMedication } from '../../actions/medication'
import { bindActionCreators } from 'redux';

class MedCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = { brand: '',
                   generic: '' }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      this.props.createMedication(
                this.state.brand,
                this.state.generic)
    }).then(this.clearValues())

  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearValues () {
    this.setState({brand: '', generic: ''})
  }

  render () {
    return (
      <div>
        <h3>Create New Entry</h3>
        <form onSubmit={this.handleSubmit} >
          <label>Brand Name</label>
          <input
            type='text'
            name='brand'
            value={this.state.brand}
            onChange={this.handleChange} />
          <br />
          <label>Generic Name</label>
          <input
            type='text'
            name='generic'
            value={this.state.generic}
            onChange={this.handleChange} />
          <br />

          <button type='submit'
            className='btn success'>
            Add Medication
          </button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMedication }, dispatch);
}

export default connect(null, mapDispatchToProps)(MedCreate);