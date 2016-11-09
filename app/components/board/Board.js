import React, { Component } from 'react'
import { connect } from 'react-redux'
import { subscribeToGame } from '../../actions/game'
import { bindActionCreators } from 'redux'
import { strPossession } from '../../helpers'
import { unsubscribe } from '../../actions/firebase'

class Board extends Component {
  componentWillMount () {
    this.props.subscribeToGame(this.props.gameKey)
  }

  componentWillUnmount () {
    this.props.unsubscribe('games/' + this.props.gameKey)
  }

  render () {
    if (!this.props.players.length) return (<div />)
    return (
      <div>
        <h3>{strPossession(this.props.players[this.props.playerTurn])} Turn</h3>
        <div className='temp-board' style={{height: '400px', width: '100%', background: '#f50', marginBottom: '15px'}} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let game = state.games.selected
  return {
    game: game,
    players: game.players,
    playerTurn: game.playerTurn
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({subscribeToGame, unsubscribe}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
