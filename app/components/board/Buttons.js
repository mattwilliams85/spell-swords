/* global alert */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { skipTurn } from '../../actions/game'
import { bindActionCreators } from 'redux'

class Actions extends Component {
  constructor (props) {
    super(props)
    this.skipTurn = this.skipTurn.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  skipTurn () {
    this.props.skipTurn()
  }

  handleClick () {
    console.log('wu')
    alert('Wished these sweet looking buttons did something? Dont worry! The game is still a work in progress, check back soon for future updates.')
  }

  render () {
    return (
      <div className={'button-wrap layout-row layout-align-end-center'} onClick={this.handleClick}>
        <div />
        <div />
        <div />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let game = state.games.selected
  return {
    user: state.currentUser.displayName,
    game: game,
    players: game.players,
    playerTurn: game.playerTurn
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({skipTurn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
