import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from './Board'
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
    if (!this.props.players[0]) return <Loading className='board' />

    return (
      <Board isPlayer={this.isPlayer()} />
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

