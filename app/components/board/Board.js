import React, { Component } from 'react'
import { connect } from 'react-redux'
import { subscribeToGame } from '../../actions/game'
import { bindActionCreators } from 'redux'

class Board extends Component {
  componentWillMount () {
    this.props.subscribeToGame(this.props.gameKey)
  }

  render () {
    return (
      <div>
        <h1>{this.props.game.playersTurn}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.games.selectedGame
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({subscribeToGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
