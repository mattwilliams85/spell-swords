import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { joinGame } from '../../actions/game'
import { Link } from 'react-router'
import { strPossession } from '../../helpers'
import moment from 'moment'

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
    let playerKeys = (Object.keys(this.props.game.players))
    let boardLink = `games/${this.props.game._key}`
    let turns = this.props.game.turnCount
    let playTitle

    turns ? playTitle = `TURN ${turns}` : playTitle = 'PLAY'

    if (this.props.isPlayer) {
      return (
        <Link to={boardLink} className='play-btn play'>{playTitle }</Link>
      )
    } else if (playerKeys.length === 1) {
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
    let playerKeys = (Object.keys(this.props.game.players))
    let player1 = playerKeys[0]
    let player2 = playerKeys[1]

    if (this.props.isPlayer && !player2) {
      return <span>Waiting for Player...</span>
    } else if (this.props.isPlayer) {
      return <span>vs <b>{player1}</b></span>
    } else if (playerKeys.length === 2) {
      return <span><b>{player1}</b> vs <b>{player2}</b></span>
    } else {
      return <span><b>{strPossession(player1)}</b> Game</span>
    }
  }

  dateText () {
    let startedAt = this.props.game.startedAt
    let startedDate = moment(startedAt).format('MMM D YYYY')
    let todayDate = moment().format('MMM D YYYY')

    return startedDate === todayDate ? moment(startedAt).format('h:mm a') : startedDate
  }

  render () {
    return (
      <div className='game-item layout-row layout-align-space-between-center'>
        <div>
          {this.buttonLink()}
          {this.vsText()}
        </div>
        <div className='date'>{this.dateText()}</div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({joinGame}, dispatch)
}

export default connect(null, mapDispatchToProps)(ListItem)
