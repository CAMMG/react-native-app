import * as types from '../constants/ActionTypes';
import { CheckObj } from '../utils/CheckObjIsNull';

const initialState = {
  isRefreshing: false,
  loading: false,
  isLoadMore: false,
  noMore: false,
  CarshowList: {}
};

export default function carshow(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CARSHOW_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
        isLoadMore: action.isLoadMore
      });
    case types.RECEIVE_CARSHOW_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        isLoadMore: false,
        noMore: CheckObj(action.CarshowList),
        CarshowList: state.isLoadMore ? loadMore(state, action) : combine(state, action),
        loading: CheckObj(action.CarshowList)
      });
    default:
      return state;
  }
}

function combine(state, action) {
  state.CarshowList = action.CarshowList;
  return state.CarshowList;
}

function loadMore(state, action) {
  state.CarshowList = state.CarshowList.concat(action.CarshowList);
  return state.CarshowList;
}