import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { joinGame } from '../../actions/game'
import { Link } from 'react-router'
import { strPossession } from '../../helpers'

class ListItem extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    this.props.joinGame(this.props.game)
  }

  buttonLink () {
    let boardLink = `games/${this.props.game._key}`

    if (this.props.isPlayer) {
      return (
        <Link to={boardLink} className='play-btn play'>PLAY</Link>
      )
    } else if (this.props.game.players.length === 1) {
      return (
        <span className='play-btn join' onClick={this.handleClick}>JOIN</span>
      )
    } else {
      return (
        <Link to={boardLink} className='play-btn watch'>WATCH</Link>
      )
    }
  }

  vsText () {
    let player1 = this.props.game.players[0]
    let player2 = this.props.game.players[1]
    if (this.props.isPlayer && !player2) return <span>Waiting for Player...</span>
    if (this.props.isPlayer) return <span>vs <b>{player1}</b></span>
    return <span><b>{strPossession(player1)}</b> Game</span>
  }

  render () {
    return (
      <div className='game-item layout-row layout-align-space-between-center'>
        <div>
          {this.buttonLink()}
          {this.vsText()}
        </div>
        <div className='count'>TURN {this.props.game.turnCount || 1}</div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({joinGame}, dispatch)
}

export default connect(null, mapDispatchToProps)(ListItem)
