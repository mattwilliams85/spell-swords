import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoardButtons from './Buttons'
import { bindActionCreators } from 'redux'
import { letters } from '../../letters'

class Board extends Component {
  render () {

    let tiles = []
    for (var x = 0; x < 7; x++) {
      for (var y = 0; y < 7; y++) {
        let rand = Math.ceil(Math.random() * 25)
        let letter = letters[rand]
        tiles.push({x: x, y: y, character: letter.character, score: letter.score})
      }
    }

    return (
      <div className='board-wrap'>
        <div className='background layer-0' />
        <div className='tile-wrap'>
          { tiles.map(tile => {
            return (
              <div
                className={`x${tile.x} y${tile.y} tile`}
                key={`x${tile.x}y${tile.y}`}>
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
