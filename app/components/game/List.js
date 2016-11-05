import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { subscribeToGames } from '../../actions/game'
import { strPossession } from '../../helpers'

class List extends Component {
  componentWillMount () {
    this.props.subscribeToGames()
  }

  render () {
    return (
      <div>
        <h3>Active Games</h3>
        {
          !this.props.games
          ? <i>No Games Available</i>
          : this.props.games.map(game =>
            <ListItem key={game._key} game={game} />
          )
        }
      </div>
    )
  }
}

class ListItem extends Component {
  constructor (props) {
    super(props)
    this.game = this.props.game
  }
  render () {
    return (
      <div>
        {
          this.game.players[1]
          ? <span>
            <Link to={`board/${this.game._key}`}>WATCH </Link>
            {this.game.players[0]}
            {` VS `}
            {this.game.players[1]}
          </span>

          : <span>
            <Link to={`board/${this.game._key}`}>JOIN </Link>
            {strPossession(this.game.players[0])} Game
          </span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games.entities
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({subscribeToGames}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
