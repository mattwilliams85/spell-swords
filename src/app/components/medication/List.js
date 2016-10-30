import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {fetchMedications, deleteMedication} from '../../actions/medication'

class MedList extends React.Component {
  componentDidMount () {
    this.props.fetchMedications()
  }

  deleteMed (id) {
    this.props.deleteMedication(id)
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
              onClick={() => this.deleteMed(med.id)}
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
    medications: state.medications
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchMedications, deleteMedication}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MedList)
