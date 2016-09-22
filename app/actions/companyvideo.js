import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { VIDEO_LIST_URL, VIDEO_HEADER_URL } from '../constants/Urls';

export function fetchCompanyVideo(isRefreshing, loading, isLoadMore, page = 1) {
  return dispatch => {
    let formData = new FormData();
    formData.append('page', page);
    formData.append('rows', '6');
    dispatch(fetchCompanyVideoList(isRefreshing, loading, isLoadMore));
    return request(VIDEO_LIST_URL, 'post',formData)
      .then((CompanyVideoList) => {
        if(CompanyVideoList.data !==''){
          dispatch(receiveCompanyVideoList(CompanyVideoList.data.rows));
          const errorMessage = CompanyVideoList.chg;
          if (errorMessage && errorMessage !== 'success') {
            toastShort(errorMessage);
          }
        }else{
          dispatch(receiveCompanyVideoList([]));
        }
      })
      .catch(() => {
        dispatch(receiveCompanyVideoList([]));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchCompanyVideoList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_VIDEO_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

function receiveCompanyVideoList(CompanyVideoList) {
  return {
    type: types.RECEIVE_VIDEO_LIST,
    CompanyVideoList
  };
}

export function fetchVideoHeader(loading) {
  return dispatch => {
    dispatch(fetchCompanyVideoHeader());
    return request(VIDEO_HEADER_URL, 'get')
      .then((VideoHeader) => {
        if(VideoHeader.data !==''){
          dispatch(receiveCompanyVideoHeader(VideoHeader.data.rows));
          const errorMessage = VideoHeader.chg;
          if (errorMessage && errorMessage !== 'success') {
            toastShort(errorMessage);
          }
        }else{
          dispatch(receiveCompanyVideoHeader([]));
        }
      })
      .catch(() => {
        dispatch(receiveCompanyVideoHeader([]));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchCompanyVideoHeader() {
  return {
    type: types.FETCH_VIDEO_HEADER,
  };
}

function receiveCompanyVideoHeader(VideoHeader) {
  return {
    type: types.RECEIVE_VIDEO_HEADER,
    VideoHeader
  };
}