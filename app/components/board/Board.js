import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoardButtons from './Buttons'
import { bindActionCreators } from 'redux'
import { randomAtoZ, validateWord } from '../../letters'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.state = {
      hoverEvents: false,
      tiles: [],
      word: [],
      activeTiles: {},
      totalScore: 0,
      tally: 0
    }
  }

  componentWillMount () {
    this.generateTiles()
  }

  componentDidMount () {
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown (tile) {
    this.pushTile(tile)

    this.setState({hoverEvents: true})
  }

  handleMouseUp () {
    let spelledWord = this.state.word.join('')
    if (validateWord(spelledWord)) {
      this.addToTotalScore(this.state.tally)
      this.generateTiles({})
    }
    this.setState({hoverEvents: false, word: [], activeTiles: {}, tally: 0})
  }

  handleMouseOver (tile) {
    if (!this.state.hoverEvents) return
    if (this.state.activeTiles[tile.key]) return

    this.pushTile(tile)
  }

  pushTile (tile) {
    this.addToActiveTiles(tile.key)
    this.addToWord(tile.character)
    this.addToTally(tile.score)
  }

  generateTiles () {
    let tiles = []
    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        let letter = randomAtoZ()
        tiles.push({
          x: x,
          y: y,
          character: letter.character,
          score: letter.score,
          key: `x${x}-y${y}`
        })
      }
    }

    this.setState({tiles: tiles})
  }

  addToTotalScore (tally) {
    let totalScore = this.state.totalScore
    this.setState({totalScore: totalScore + tally})
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

  render () {
    return (
      <div className='board-wrap'>
        <div className='temp-word'>
          <div className='letters'>
            { this.state.word.map((letter, index) => {
              return (<span key={index}>{letter}</span>)
            })}
          </div>
          <div>Tally: {this.state.tally}</div>
          <div>Total Score: {this.state.totalScore}</div>
        </div>
        <div className='background layer-0' />
        <div className='tile-wrap'>
          { this.state.tiles.map(tile => {
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
    players: game.players,
    playerTurn: game.playerTurn,
    turnCount: game.turnCount
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
