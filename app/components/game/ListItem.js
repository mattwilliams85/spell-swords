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
        <Link to={boardLink}>PLAY </Link>
      )
    } else if (this.props.game.players.length === 1) {
      return (
        <span className='link' onClick={this.handleClick}>JOIN </span>
      )
    } else {
      return (
        <Link to={boardLink}>WATCH </Link>
      )
    }
  }

  vsText () {
    let player1 = this.props.game.players[0]
    let player2 = this.props.game.players[1]

    if (player2) return `${player1} VS ${player2}`
    return `${strPossession(player1)} Game`
  }

  render () {
    return (
      <div>
        {this.buttonLink()}
        {this.vsText()}
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({joinGame}, dispatch)
}

export default connect(null, mapDispatchToProps)(ListItem)
