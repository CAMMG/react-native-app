import * as types from '../constants/ActionTypes';
import { CheckObj } from '../utils/CheckObjIsNull';

const initialState = {
  isRefreshing: false,
  loading: false,
  isLoadMore: false,
  noMore: false,
  CompanyNewsList: {},
  CompanyNewsTop: {}
};

export default function companynews(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_NEWS_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
        isLoadMore: action.isLoadMore
      });
    case types.RECEIVE_NEWS_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        isLoadMore: false,
        noMore: CheckObj(action.CompanyNewsList),
        CompanyNewsList: state.isLoadMore ? loadMore(state, action) : combine(state, action),
        loading: CheckObj(action.CompanyNewsList)
      });
    case types.RECEIVE_NEWS_TOP:
      return Object.assign({}, state, {
        CompanyNewsTop: action.CompanyNewsTop
      });
    default:
      return state;
  }
}

function combine(state, action) {
  state.CompanyNewsList = action.CompanyNewsList;
  return state.CompanyNewsList;
}

function loadMore(state, action) {
  state.CompanyNewsList = state.CompanyNewsList.concat(action.CompanyNewsList);
  return state.CompanyNewsList;
}