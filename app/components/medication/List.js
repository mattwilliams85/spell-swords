import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {deleteMedication, subscribeToMedications } from '../../actions/medication'

class MedList extends React.Component {
  componentWillMount () {
    this.props.subscribeToMedications()
  }

  deleteMed (key) {
    this.props.deleteMedication(key)
  }

  render () {
    return (
      <div>
        <h3>Current Medications</h3>
        {
          !this.props.medications
          ? <i>No Medications Listed</i>
          : this.props.medications.map(med =>
            <MedItem
              key={med._key}
              props={med}
              onClick={() => this.deleteMed(med._key)}
            />
          )
        }
      </div>
    )
  }
}

const MedItem = ({onClick, props}) => (
  <li>
    {props.brand}
    {props.generic ? ` (${props.generic}) ` : ' '}
    <i className='link mdi mdi-delete'
      onClick={onClick} />
  </li>
)

const mapStateToProps = (state) => {
  return {
    medications: state.medications.entities,
    errors: state.medications.errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({deleteMedication, subscribeToMedications}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MedList)
