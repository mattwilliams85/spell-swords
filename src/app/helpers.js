export function requireAuth(nextState, replace) {
    const data = JSON.parse(localStorage.getItem(localStorage.key(0)));
    if (!data.uid) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname,
            },
        });
    }
}

export function objectToArray (data) {
  if (!data) return
  let dataWithKeys = Object.keys(data).map((key) => {
     var obj = data[key];
     obj._key = key;
     return obj
  });
  return dataWithKeys
}