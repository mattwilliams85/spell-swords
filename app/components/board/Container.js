import React, { Component } from 'react'
import Board from './Board'
import ChatList from '../chat/List'
import ChatCreate from '../chat/Create'
import Loading from '../helpers/spinner'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isPlayer } from '../../helpers'
import { subscribeToGame, deleteGame } from '../../actions/game'
import { unsubscribe } from '../../actions/firebase'

class Container extends Component {
  constructor (props) {
    super(props)
    this.forfeit = this.forfeit.bind(this)
  }

  componentWillMount () {
    this.props.subscribeToGame(this.props.params.key)
  }

  componentWillUnmount () {
    this.props.unsubscribe('games/' + this.props.params.key)
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
    let playerKeys = (Object.keys(this.props.game.players))
    let validPlayer = isPlayer(this.props.game, this.props.user)
    let input = null
    if (validPlayer) input = <ChatCreate />
    if (!Object.keys(this.props.players).length) return <Loading className='board' />

    return (
      <div className='ss-board'>
        <div className='layout-row layout-align-space-between'>
          <div className='layout-row'>
            <h3 className={`${this.isActive(0)} name`}>{playerKeys[0]}</h3>
            &nbsp;&nbsp; VS &nbsp;&nbsp;
            <h3 className={`${this.isActive(1)} name`}>{playerKeys[1] || 'Waiting for Player..'}</h3>
          </div>
          <i className='mdi mdi-flag' onClick={this.forfeit} />
        </div>

        <div className='layout-column layout-gt-sm-row shadow'>
          <Board user={this.props.user} />
          <div className='ss-chat'>
            <ChatList isPlayer={validPlayer} />
            { input }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let game = state.games.selected

  return {
    game: game,
    user: state.currentUser.displayName,
    players: game.players,
    playerTurn: game.playerTurn,
    turnCount: game.turnCount
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({subscribeToGame, unsubscribe, deleteGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)

