import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from './Board'
import Loading from '../helpers/spinner'
import ChatList from '../chat/List'
import ChatCreate from '../chat/Create'
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

  isPlayer () {
    let game = this.props.game
    let user = this.props.user

    if (game.players.indexOf(user) !== -1) return true
  }

  forfeit () {
    if (window.confirm('DO YOU REALLY WANT TO SURRENDER?')) {
      this.props.deleteGame(this.props.game.key)
    }
  }

  render () {
    let isPlayer = this.isPlayer()
    let input = null
    if (isPlayer) input = <ChatCreate />
    if (!this.props.players[0]) return <Loading className='board' />

    return (
      <div className='ss-board'>
        <div className='layout-row layout-align-space-between'>
          <h5>Turn {this.props.turnCount}</h5>
          <i className='mdi mdi-flag' onClick={this.forfeit} />
        </div>

        <div className='layout-row'>
          <h3 className={`${this.isActive(0)} name`}>{this.props.players[0]}</h3>
          &nbsp;&nbsp; VS &nbsp;&nbsp;
          <h3 className={`${this.isActive(1)} name`}>{this.props.players[1]}</h3>
        </div>

        <div className='layout-column layout-gt-sm-row shadow'>
          <Board />
          <div className='ss-chat'>
            <ChatList isPlayer={isPlayer} />
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

