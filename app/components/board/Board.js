import React, { Component } from 'react'
import BoardButtons from './Buttons'
import Layers from './Layers'
import TilesCtrl from '../../controllers/tiles'
import moment from 'moment'
import { playWord } from '../../actions/game'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { skipTurn } from '../../actions/game'
import { strPossession } from '../../helpers'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.state = {
      hoverEvents: false,
      tiles: [],
      previousTile: {},
      word: [],
      activeTiles: {},
      tally: 0,
      time: 30000
    }
  }

  componentDidMount () {
    window.addEventListener('mouseup', this.handleMouseUp)

    this.timer = setInterval(() => {this.playerTimer()}, 1000)
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.handleMouseUp)
    clearInterval(this.timer);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.playerTurn !== nextProps.playerTurn) {
      this.setState({time: 30000})
    }
  }

  getScore () {
    return this.props.players[this.props.user].score
  }

  getPlayer (num) {
    let arr = Object.keys(this.props.players)
    let player = this.props.players[arr[num]]
    if (!player) return {score: 0}
    player.displayName = arr[num]
    return player
  }

  handleMouseDown (tile) {
    this.pushTile(tile)

    this.setState({hoverEvents: true, previousTile: tile})
  }

  handleMouseUp () {
    let spelledWord = this.state.word.join('')
    if (TilesCtrl.validateWord(spelledWord) && !this.isDisabled()) {
      this.setState({time: 30000})
      this.props.playWord(spelledWord, this.state.tally)
    }
    this.setState({hoverEvents: false, word: [], activeTiles: {}, tally: 0})
  }

  handleMouseOver (tile) {
    if (!this.state.hoverEvents) return
    if (this.state.activeTiles[tile.key]) return
    if (this.state.word.length > 18) return
    let prev = this.state.previousTile
    if (
      tile.x > prev.x + 1 ||
      tile.x < prev.x - 1 ||
      tile.y > prev.y + 1 ||
      tile.y < prev.y - 1
    ) return
    this.pushTile(tile)
  }

  playerTimer () {
    let time = this.state.time
    if (!time) {
      this.props.skipTurn()
      this.setState({time: 30000})
    }

    this.setState({time: time -= 1000})
  }

  formatTime () {
    return moment(this.state.time).format('m:ss')
  }

  turnMsg () {
    let opponent
    let player1 = this.getPlayer(0).displayName
    let player2 = this.getPlayer(1).displayName

    if (player1 === this.props.user) {
      opponent = player2
    } else {
      opponent = player1
    }
    if (this.isDisabled()) return strPossession(opponent) + ' turn'
    return 'Your turn!'
  }

  pushTile (tile) {
    this.addToActiveTiles(tile.key)
    this.addToWord(tile.character)
    this.addToTally(tile.score)
    this.setState({previousTile: tile})
  }

  addToActiveTiles (key) {
    let tile = {}
    tile[key] = true
    let activeTiles = Object.assign({}, this.state.activeTiles, tile)
    this.setState({activeTiles: activeTiles})
  }

  addToWord (character) {
    this.setState({word: [...this.state.word, character]})
  }

  addToTally (score) {
    let tally = this.state.tally
    this.setState({tally: tally + score})
  }

  isActiveTile (key) {
    if (this.state.activeTiles[key]) return 'active'
  }

  isDisabled () {
    let user = this.props.user
    let players = Object.keys(this.props.players)
    let playerTurn = this.props.playerTurn

    if (players[playerTurn] !== user) return 'disabled'
  }

  isSinglePlayer () {
    if (Object.keys(this.props.players).length < 2) return 'single'
  }

  letterSize () {
    if (this.state.word.length > 13) return '17pt'
    if (this.state.word.length > 11) return '20pt'
    if (this.state.word.length > 9) return '25pt'
    if (this.state.word.length > 7) return '30pt'
    return '35pt'
  }

  render () {
    return (
      <div className={`${this.isDisabled()} ${this.isSinglePlayer()} board-wrap`}>

        <div className='letters-wrap layout-row layout-align-center-center'>
          <div className='letters' style={{fontSize: this.letterSize()}}>
            { this.state.word.map((letter, index) => {
              return (<span key={index}>{letter}</span>)
            })}
          </div>
          <div className={this.state.tally ? 'points' : 'hide'}>+{this.state.tally}</div>
        </div>

        <Layers />

        <div className='timer-wrap'>
          <div className='player-score p1'>{this.getPlayer(0).score}</div>
          <div className='player-score p2'>{this.getPlayer(1).score}</div>
          <div className='timer'>{this.formatTime()}</div>
        </div>

        <div className='turn-msg'>{this.turnMsg()}</div>

        <div className='tile-wrap'>
          { this.props.tiles.map(tile => {
            return (
              <div
                className={`x${tile.x} y${tile.y} ${this.isActiveTile(tile.key)} tile`}
                key={tile.key}
                onMouseDown={this.handleMouseDown.bind(this, tile)}>
                <div
                  className='hover-box'
                  onMouseOver={this.handleMouseOver.bind(this, tile)}
                  value={tile.character} />
                <span className='character'>{tile.character}</span>
                <span className='score'>{tile.score}</span>
              </div>
            )
          }) }
        </div>

        <div className='background layer-1' />

        <BoardButtons />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let game = state.games.selected
  return {
    game: game,
    user: state.currentUser.displayName,
    players: game.players,
    playerTurn: game.playerTurn,
    turnCount: game.turnCount,
    tiles: game.tiles,
    tally: game.tally
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({playWord, skipTurn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
