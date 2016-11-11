import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteGame } from '../../actions/game'
import { bindActionCreators } from 'redux'

class Board extends Component {
  constructor (props) {
    super(props)
    this.forfeit = this.forfeit.bind(this)
  }

  isActive (player) {
    if (this.props.playerTurn === player) return 'active'
  }

  forfeit () {
    if (window.confirm('DO YOU REALLY WANT TO SURRENDER?')) {
      this.props.deleteGame(this.props.game.key)
    }
  }

  render () {
    return (
      <div className='ss-board layout-column layout-align-space-between-center'>
        <div>
          <div className='layout-row layout-align-space-between'>
            <h5>Turn {this.props.turnCount}</h5>
            <i className='mdi mdi-flag' onClick={this.forfeit} />
          </div>
          <div className='layout-row layout-align-space-between-start'>
            <h3 className={`${this.isActive(0)} name`}>{this.props.players[0]}</h3>
            <h3 className={`${this.isActive(1)} name`}>{this.props.players[1]}</h3>
          </div>
          <div className='temp-board' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let game = state.games.selected
  return {
    game: game,
    players: game.players,
    playerTurn: game.playerTurn,
    turnCount: game.turnCount
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({deleteGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
