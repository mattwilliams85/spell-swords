import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class List extends Component {
  componentDidUpdate () {
    let chatbox = document.getElementById('chatbox')
    chatbox.scrollTop = chatbox.scrollHeight
  }

  whichPlayer (player) {
    if (this.props.isPlayer) {
      return player === this.props.user ? 'self' : 'opponent'
    } else {
      return this.props.players[0] === player ? 'self' : 'opponent'
    }
  }

  dateText (text) {
    let startedAt = text
    let startedDate = moment(startedAt).format('MMM D YYYY')
    let todayDate = moment().format('MMM D YYYY')

    return startedDate === todayDate ? moment(startedAt).format('h:mm a') : startedDate
  }

  render () {
    return (
      <div>
        <div className='header'>
          <h4>In-Game Chat</h4>
        </div>
        <div className='chatbox' id='chatbox'>
          {
            this.props.chat.map(text =>
              <div
                key={text._key}
                className={`${this.whichPlayer(text.player)} layout-row layout-align-start-end`}>
                <span className='msg'>
                  <div className='pointer' />
                  <span>{text.msg}</span>
                </span>
                <span className='date'>{this.dateText(text.createdAt)}</span>
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
    chat: state.games.selected.chat.slice(-10),
    players: state.games.selected.players,
    user: state.currentUser.displayName
  }
}

export default connect(mapStateToProps)(List)
