import Board from './Board'
import ChatList from '../chat/List'
import ChatCreate from '../chat/Create'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Container extends Component {
  isGamePlayer () {
    let game = this.props.game
    let player = this.props.player
    if (game.players.indexOf(player) !== -1) return true
  }

  render () {
    let isPlayer = this.isGamePlayer()
    let input = null
    if (isPlayer) input = <ChatCreate />

    return (
      <div>
        <Board gameKey={this.props.params.key} isPlayer={isPlayer} />
        <div className='chat-box'>
          <ChatList isPlayer={isPlayer} />
          { input }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.currentUser.displayName,
    game: state.games.selected
  }
}

export default connect(mapStateToProps)(Container)
