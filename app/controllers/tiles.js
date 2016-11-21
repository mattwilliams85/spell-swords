import wordList from 'pf-sowpods/src/dictionary'

const TilesCtrl = {
  validateWord (word) {
    // 267751 WORDS
    if (word.length < 2) return
    if (wordList.indexOf(word.toUpperCase()) !== -1) return true
  },

  generateTiles () {
    let tiles = []
    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        tiles[`x${x}-y${y}`] = TilesCtrl.newTile(x, y)
      }
    }
    return tiles
  },

  newTile (x, y) {
    let tile
    let letter = TilesCtrl.randomAtoZ()
    tile = {
      x: x,
      y: y,
      character: letter.character,
      score: letter.score,
      id: `x${x}-y${y}`,
      shifted: 0
    }
    return tile
  },

  replaceTiles (played, tiles) {
    for (let key in tiles) {
      tiles[key].shifted = 0
    }

    let shifts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for (let key in played) {
      let x = played[key].x
      shifts[x] += 1
    }

    for (let key in played) {
      let x = played[key].x
      let y = played[key].y

      for (let i = y; i >= 0; i--) {
        let pos = `x${x}-y${i}`
        let abovePos = `x${x}-y${i - 1}`

        if (i === 0) {
          tiles[pos] = TilesCtrl.newTile(x, i)
          tiles[pos].shifted = shifts[x]
          continue
        }
        tiles[pos].character = tiles[abovePos].character
        tiles[pos].score = tiles[abovePos].score
        tiles[pos].shifted = shifts[x]
      }
    }
    return tiles
  },

  randomAtoZ () {
    let random = Math.random() * 100000
    let letter
    for (letter in letterFreq) {
      if (random < letterFreq[letter]) {
        return letters[letter]
      }
    }
  }
}

const letters = [
  {character: 'a', score: 1},
  {character: 'b', score: 3},
  {character: 'c', score: 3},
  {character: 'd', score: 2},
  {character: 'e', score: 1},
  {character: 'f', score: 4},
  {character: 'g', score: 2},
  {character: 'h', score: 4},
  {character: 'i', score: 1},
  {character: 'j', score: 8},
  {character: 'k', score: 5},
  {character: 'l', score: 1},
  {character: 'm', score: 3},
  {character: 'n', score: 1},
  {character: 'o', score: 1},
  {character: 'p', score: 3},
  {character: 'q', score: 10},
  {character: 'r', score: 1},
  {character: 's', score: 1},
  {character: 't', score: 1},
  {character: 'u', score: 1},
  {character: 'v', score: 4},
  {character: 'w', score: 4},
  {character: 'x', score: 8},
  {character: 'y', score: 4},
  {character: 'z', score: 10}
]

const letterFreq = {
  0: 8167,
  1: 9659,
  2: 12441,
  3: 16694,
  4: 29396,
  5: 31624,
  6: 33639,
  7: 39733,
  8: 46699,
  9: 46852,
  10: 47624,
  11: 51649,
  12: 54055,
  13: 60804,
  14: 68311,
  15: 70240,
  16: 70335,
  17: 76322,
  18: 82649,
  19: 91705,
  20: 94463,
  21: 95441,
  22: 97801,
  23: 97951,
  24: 99925,
  25: 100000
}

export default TilesCtrl
