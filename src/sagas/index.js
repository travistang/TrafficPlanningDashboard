import {
  call,
  all,
  put,
  takeEvery,
  takeLatest,
  select } from 'redux-saga/effects'
import * as Actions from '../actions'
import Api from '../api'
// intialize API instance
const apiInstance = new Api()
// selectors
const getSinks = (state) => state.sinks
const getDestinations = (state) => state.destinations
// handlers
function* computeSolution() {
  let sinks = yield select(getSinks),
      destinations = yield select(getDestinations)

  let results = yield call(apiInstance.computeRoute,sinks,destinations)

  yield put({type: Actions.ON_SOLUTION_COMPUTED, results})
}

// watchers
function* watchComputeSolution() {
  yield takeLatest(Actions.COMPUTE_SOLUTION,computeSolution)
}
function* rootSaga () {
  yield all([
    watchComputeSolution()
  ])
}

export default rootSaga
