import React, { Component } from 'react'
import { connect } from 'react-redux'

class List extends Component {
  playerDesignation (player) {
    return player === this.props.game.players[0]
    ? 'player1'
    : 'player2'
  }

  render () {
    return (
      <div>
        <h3>ChatBox</h3>
        {
          this.props.chat.map(text =>
            <div key={text._key}>
              <span className={this.playerDesignation(text.player)}>{text.player}</span>
              {': '}
              {text.msg}
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.selected,
    chat: state.games.selected.chat.slice(-10)
  }
}

export default connect(mapStateToProps)(List)
