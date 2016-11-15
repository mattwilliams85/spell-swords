import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoardButtons from './Buttons'
import { bindActionCreators } from 'redux'
import { randomAtoZ } from '../../letters'

class Board extends Component {
  constructor (props) {
    super(props)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.state = {hoverEvents: false, tiles: [], word: [], activeTiles: {}}
  }

  componentWillMount () {
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

  componentDidMount () {
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown (tile) {
    let activeTiles = this.addToActiveTiles(tile.key)
    let word = this.addToWord(tile.character, tile.key)

    this.setState({word: word, hoverEvents: true, activeTiles: activeTiles})
  }

  handleMouseUp () {
    this.setState({hoverEvents: false, word: [], activeTiles: {}})
  }

  handleMouseOver (tile) {
    if (!this.state.hoverEvents) return
    if (this.state.activeTiles[tile.key]) return

    let activeTiles = this.addToActiveTiles(tile.key)
    let word = this.addToWord(tile.character, tile.key)

    this.setState({word: word, activeTiles: activeTiles})
  }

  addToActiveTiles (key) {
    let activeTile = {}
    activeTile[key] = true
    return Object.assign({}, this.state.activeTiles, activeTile)
  }

  addToWord (character, key) {
    let newLetter = {character: character, key: key}
    newLetter[key] = true
    return [...this.state.word, newLetter]
  }

  isActiveTile (key) {
    if (this.state.activeTiles[key]) return 'active'
  }

  render () {
    return (
      <div className='board-wrap'>
        <div className='temp-word'>
          { this.state.word.map(letter => {
            return (<span key={letter.key}>{letter.character}</span>)
          })}
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
