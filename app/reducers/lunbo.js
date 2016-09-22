import * as types from '../constants/ActionTypes';

const initialState = {
  loading: false,
  lunboList: {}
};

export default function lunbo(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LUNBO_LIST:
      return Object.assign({}, state, {
        loading: true
      });
    case types.RECEIVE_LUNBO_LIST:
      return Object.assign({}, state, {
        loading: false,
        lunboList: action.lunboList
      });
    default:
      return state;
  }
}
