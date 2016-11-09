import React, { Component } from 'react'
import { connect } from 'react-redux'

class List extends Component {
  componentDidUpdate () {
    let chatbox = document.getElementById('chatbox')
    chatbox.scrollTop = chatbox.scrollHeight
  }

  whichPlayer (player) {
    if (this.props.isPlayer) {
      return player === this.props.player ? 'self' : 'opponent'
    } else {
      return this.props.players[0] === player ? 'self' : 'opponent'
    }
  }

  render () {
    return (
      <div>
        <h5>Chat</h5>
        <div className='chatbox' id='chatbox'>
          {
            this.props.chat.map(text =>
              <div key={text._key} className={`${this.whichPlayer(text.player)} layout-row`}>
                <span className='msg'>
                  <div className='pointer' />
                  <span>{text.msg}</span>
                </span>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.selected,
    chat: state.games.selected.chat.slice(-10),
    players: state.games.selected.players,
    player: state.currentUser.displayName
  }
}

export default connect(mapStateToProps)(List)
