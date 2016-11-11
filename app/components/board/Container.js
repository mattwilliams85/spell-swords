import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from './Board'
import BoardButtons from './Buttons'
import ChatList from '../chat/List'
import ChatCreate from '../chat/Create'
import Loading from '../helpers/spinner'
import { subscribeToGame } from '../../actions/game'
import { unsubscribe } from '../../actions/firebase'

class Container extends Component {
  componentWillMount () {
    this.props.subscribeToGame(this.props.params.key)
  }

  componentWillUnmount () {
    this.props.unsubscribe('games/' + this.props.params.key)
  }

  isPlayer () {
    let game = this.props.game
    let user = this.props.user

    if (game.players.indexOf(user) !== -1) return true
  }

  render () {
    let isPlayer = this.isPlayer()
    let input = null
    if (isPlayer) input = <ChatCreate />
    if (!this.props.players[0]) return <Loading className='board' />

    return (
      <div className='board layout-column layout-align-space-between-start'>
        <Board isPlayer={this.isPlayer()} />
        <BoardButtons />
        <div className='ss-chat'>
          <ChatList isPlayer={isPlayer} />
          { input }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.selected,
    user: state.currentUser.displayName,
    players: state.games.selected.players
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({subscribeToGame, unsubscribe}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)

