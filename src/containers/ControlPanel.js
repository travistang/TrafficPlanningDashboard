import ControlPanel from '../components/ControlPanel'
import { connect } from 'react-redux'
import * as Actions from '../actions'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    computeSolution: () => dispatch({type: Actions.COMPUTE_SOLUTION})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlPanel)
