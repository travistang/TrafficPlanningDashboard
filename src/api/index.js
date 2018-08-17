export default class {
  computeRoute(sinks,destinations) {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        let sink = sinks[0] // dont bother the others...
        let detstinationsRemaining = [...destinations]
        let routes = []
        let drawAndRemove = () => {
          if(detstinationsRemaining.length == 0) return null
          let ind = Math.floor(Math.random() * detstinationsRemaining.length)
          let dest = detstinationsRemaining[ind]
          // remove the station
          detstinationsRemaining = detstinationsRemaining.filter(dest => dest.id != detstinationsRemaining[ind].id)
          return dest
        }
        // draw two destinations, form a sink => route => route => sink route
        while(detstinationsRemaining.length > 0) {
          let dest1 = drawAndRemove()
          let dest2 = drawAndRemove()
          let route = [
            sink,dest1,dest2,sink
          ].filter(t => !!t)
          routes = routes.concat({routes:route}) // dont insert null stuff
        }
        resolve(routes)
      },2000)
    })
  }
}
