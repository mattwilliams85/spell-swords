import wordList from 'pf-sowpods/src/dictionary'

export function validateWord (word) {
  if (wordList.indexOf(word.toUpperCase()) !== -1) return true
}

export const randomAtoZ = ((lookup) => {
  return function () {
    let random = Math.random() * 100000
    let letter
    for (letter in lookup) {
      if (random < lookup[letter]) {
        return letters[letter]
      }
    }
  }
})({
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
})

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
