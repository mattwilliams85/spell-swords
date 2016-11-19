import React, { Component } from 'react'
import ListItem from './ListItem'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { subscribeToGames } from '../../actions/game'
import { unsubscribe } from '../../actions/firebase'
import { isPlayer } from '../../helpers'

class List extends Component {
  componentWillMount () {
    this.props.subscribeToGames()
  }

  componentWillUnmount () {
    this.props.unsubscribe('games')
  }

  filterGames (type) {
    let games = []
    let player = this.props.player

    switch (type) {
      case 'player':
        this.props.games.forEach((game) => {
          if (isPlayer(game, player)) games.push(game)
        })
        return games

      default:
        this.props.games.forEach((game) => {
          if (!isPlayer(game, player)) games.push(game)
        })
        return games
    }
  }

  render () {
    return (
      <div>
        <div className='header'>My Games</div>
        {
          !this.filterGames('player').length
          ? <i>No Games Available</i>
          : this.filterGames('player').map(game =>
            <ListItem
              key={game._key}
              game={game}
              isPlayer={isPlayer(game, this.props.player)} />
          )
        }

        <div className='header'>Active Games</div>
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
