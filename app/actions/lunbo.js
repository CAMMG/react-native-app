import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { LUNBO_LIST_URL } from '../constants/Urls';

export function fetchLunbo() {
  return dispatch => {
    dispatch(fetchLunboList());
    return request(LUNBO_LIST_URL, 'get')
      .then((lunboList) => {
        if(lunboList.data !=''){
          dispatch(receiveLunboList(lunboList.data.rows));
          const errorMessage = lunboList.chg;
          if (errorMessage && errorMessage !== 'success') {
            toastShort(errorMessage);
          }
        }else{
          dispatch(receiveLunboList([]));
        }
      })
      .catch(() => {
        dispatch(receiveLunboList([]));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchLunboList() {
  return {
    type: types.FETCH_LUNBO_LIST
  };
}

function receiveLunboList(lunboList) {
  return {
    type: types.RECEIVE_LUNBO_LIST,
    lunboList
  };
}