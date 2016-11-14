import React, { Component } from 'react'
import { connect } from 'react-redux'
import { skipTurn } from '../../actions/game'
import { bindActionCreators } from 'redux'

class Actions extends Component {
  constructor (props) {
    super(props)
    this.skipTurn = this.skipTurn.bind(this)
  }

  isDisabled () {
    let user = this.props.user
    let players = this.props.players
    let playerTurn = this.props.playerTurn

    if (players[playerTurn] !== user) return 'disabled'
  }

  skipTurn () {
    this.props.skipTurn()
  }

  render () {
    return (
      <div className='layout-fill'>
        <div className={`${this.isDisabled()} button-wrap layout-row layout-align-end-center`}>
          <div className='btn skip' onClick={this.skipTurn}>SKIP TURN</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let game = state.games.selected
  return {
    user: state.currentUser.displayName,
    game: game,
    players: game.players,
    playerTurn: game.playerTurn
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({skipTurn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
