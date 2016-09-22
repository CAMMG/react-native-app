import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { NEWS_LIST_URL } from '../constants/Urls';

export function fetchCompanyNews(isRefreshing, loading, isLoadMore, page = 1) {
  return dispatch => {
    let formData = new FormData();
    formData.append('page', '1');
    formData.append('rows', '6');
    dispatch(fetchCompanyNewsList(isRefreshing, loading, isLoadMore));
    return request(NEWS_LIST_URL, 'post', formData)
      .then((CompanyNewsList) => {
        if(CompanyNewsList.data != ''){
          dispatch(receiveCompanyNewsList(CompanyNewsList.data.rows));
          const errorMessage = CompanyNewsList.chg;
          if (errorMessage && errorMessage !== 'success') {
            toastShort(errorMessage);
          }
        }else{
          dispatch(receiveCompanyNewsList([]));
        } 
      })
      .catch(() => {
        dispatch(receiveCompanyNewsList([]));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchCompanyNewsList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_NEWS_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

function receiveCompanyNewsList(CompanyNewsList) {
  return {
    type: types.RECEIVE_NEWS_LIST,
    CompanyNewsList
  };
}

export function fetchNewsTop() {
  return dispatch => {
    let formData = new FormData();
    formData.append('istop', 'Y');
    dispatch(fetchCompanyNewsTop());
    return request(NEWS_LIST_URL, 'post', formData)
      .then((CompanyNewsList) => {
        if(CompanyNewsList.data != ''){
          dispatch(receiveCompanyNewsTop(CompanyNewsList.data.rows));
          const errorMessage = CompanyNewsList.chg;
          if (errorMessage && errorMessage !== 'success') {
            toastShort(errorMessage);
          }
        }else{
          dispatch(receiveCompanyNewsTop([]));
        } 
      })
      .catch(() => {
        dispatch(receiveCompanyNewsTop([]));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchCompanyNewsTop() {
  return {
    type: types.FETCH_NEWS_TOP
  };
}

function receiveCompanyNewsTop(CompanyNewsTop) {
  return {
    type: types.RECEIVE_NEWS_TOP,
    CompanyNewsTop
  };
}