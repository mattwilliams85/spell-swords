import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteGame } from '../../actions/game'
import ChatList from '../chat/List'
import ChatCreate from '../chat/Create'
import { bindActionCreators } from 'redux'
import BoardButtons from './Buttons'

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
    let isPlayer = this.props.isPlayer
    let input = null
    if (isPlayer) input = <ChatCreate />

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

        <div className='layout-column layout-gt-sm-row'>
          <div className='board-wrap'>
            <div className='background layer-0' />
            <div className='background layer-1' />
            <BoardButtons />
          </div>
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
    players: game.players,
    playerTurn: game.playerTurn,
    turnCount: game.turnCount
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({deleteGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
