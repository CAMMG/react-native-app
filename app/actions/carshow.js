import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { NEWS_LIST_URL } from '../constants/Urls';

export function fetchCarshow(isRefreshing, loading, isLoadMore,page=1) {
  let formData = new FormData();
  formData.append('page', page);
  formData.append('rows', '6');
  formData.append('type', 'C');
  return dispatch => {
    dispatch(fetchCarshowList(isRefreshing, loading, isLoadMore));
    return request(NEWS_LIST_URL, 'post', formData)
      .then((CarshowList) => {
        if(CarshowList.data !==''){
          dispatch(receiveCarshowList(CarshowList.data.rows));
          const errorMessage = CarshowList.chg;
          if (errorMessage && errorMessage !== 'success') {
            toastShort(errorMessage);
          }
        }else{
          dispatch(receiveCarshowList([]));
        }
      })
      .catch((error) => {
        dispatch(receiveCarshowList([]));
        alert(error);
        // toastShort('网络出错，请重试');
      });
  };
}

function fetchCarshowList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_CARSHOW_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

function receiveCarshowList(CarshowList) {
  return {
    type: types.RECEIVE_CARSHOW_LIST,
    CarshowList
  };
}