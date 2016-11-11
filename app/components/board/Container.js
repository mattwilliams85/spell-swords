import Board from './Board'
import BoardButtons from './Buttons'
import ChatList from '../chat/List'
import ChatCreate from '../chat/Create'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Container extends Component {
  isPlayer () {
    let game = this.props.game
    let user = this.props.user

    if (game.players.indexOf(user) !== -1) return true
  }

  render () {
    let isPlayer = this.isPlayer()
    let input = null

    if (isPlayer) input = <ChatCreate />

    return (
      <div className='board layout-column layout-align-space-between-start'>
        <Board gameKey={this.props.params.key} isPlayer={this.isPlayer()} />
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

export default connect(mapStateToProps)(Container)
