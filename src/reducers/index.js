import * as Actions from '../actions'
let sinksId = 0
let destinationsId = 0
const initialState = {
  sinks: [],
  destinations: [],
  results: [],
  computing: false,
}

export default function(state = initialState,action) {
  switch(action.type) {
    case Actions.ADD_SINK:
      return {...state,sinks: state.sinks.concat({
        name: `Sink ${sinksId + 1}`,
        id: sinksId++,
        type: 'sink',
        location: action.sink
      })}
    case Actions.ADD_DESTINATION:
      return {...state,destinations: state.destinations.concat({
        name: `Destination ${destinationsId + 1}`,
        id: destinationsId++,
        type: 'destination',
        location: action.destination
      })}
    case Actions.COMPUTE_SOLUTION:
      return {...state,results: [],computing: true}
    case Actions.ON_SOLUTION_COMPUTED:
      return {...state,results: action.results,computing: false}
    default:
      return state
  }
}
