import * as types from '../constants/ActionTypes';
import { CheckObj } from '../utils/CheckObjIsNull';

const initialState = {
  isRefreshing: false,
  loading: false,
  isLoadMore: false,
  noMore: false,
  CompanyVideoList: {},
  VideoHeader: {}
};

export default function companyvideo(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_VIDEO_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
        isLoadMore: action.isLoadMore
      });
    case types.RECEIVE_VIDEO_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        isLoadMore: false,
        noMore: CheckObj(action.CompanyVideoList),
        CompanyVideoList: state.isLoadMore ? loadMore(state, action) : combine(state, action),
        loading: CheckObj(action.CompanyVideoList)
      });
    case types.RECEIVE_VIDEO_HEADER:
      return Object.assign({}, state, {
        VideoHeader: action.VideoHeader 
      });
    default:
      return state;
  }
}

function combine(state, action) {
  state.CompanyVideoList = action.CompanyVideoList;
  return state.CompanyVideoList;
}

function loadMore(state, action) {
  state.CompanyVideoList = state.CompanyVideoList.concat(action.CompanyVideoList);
  return state.CompanyVideoList;
}