// import React from react
import MapView from '../components/MapView'
import { connect } from 'react-redux'
import * as Actions from '../actions'
function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    addSink: (sink) => dispatch({type: Actions.ADD_SINK,sink}),
    addDestination: (destination) => dispatch({type: Actions.ADD_DESTINATION,destination})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MapView)
