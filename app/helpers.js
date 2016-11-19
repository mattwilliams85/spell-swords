export function objectToArray (data) {
  if (!data) return []
  let dataWithKeys = Object.keys(data).map((key) => {
    var obj = data[key]
    obj._key = key
    return obj
  })
  return dataWithKeys
}

export function strPossession (string) {
  if (!string) return
  return string.slice(-1) === 's' ? string + "'" : string + "'s"
}

export function isPlayer (game, player) {
  if (player in game.players) return true
}
