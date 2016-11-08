import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { subscribeToGames } from '../../actions/game'
import { unsubscribe } from '../../actions/firebase'
import ListItem from './ListItem'

class List extends Component {
  componentWillMount () {
    this.props.subscribeToGames()
  }

  componentWillUnmount () {
    this.props.unsubscribe('games')
  }

  isPlayer (game) {
    let players = game.players
    let player = this.props.player

    if (players.indexOf(player) !== -1) return true
  }

  filterGames (type) {
    let games = []

    switch (type) {
      case 'player':
        this.props.games.forEach((game) => {
          if (this.isPlayer(game)) games.push(game)
        })
        return games

      default:
        this.props.games.forEach((game) => {
          if (!this.isPlayer(game)) games.push(game)
        })
        return games
    }
  }

  render () {
    return (
      <div>
        <h3>My Games</h3>
        {
          !this.filterGames('player').length
          ? <i>No Games Available</i>
          : this.filterGames('player').map(game =>
            <ListItem
              key={game._key}
              game={game}
              isPlayer={this.isPlayer(game)} />
          )
        }

        <h3>Active Games</h3>
        {
          !this.filterGames().length
          ? <i>No Games Available</i>
          : this.filterGames().map(game =>
            <ListItem key={game._key} game={game} />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games.entities,
    player: state.currentUser.displayName
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({subscribeToGames, unsubscribe}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
