const API = {
  SAVE_APPOINT_INFO: "http://www.zj-museum.com.cn:7002/external/appoint/saveTicketAppoint",
  CREATE_CONNECT: "http://127.0.0.1:18889/api/connect",
  CRRD_STATUS: "http://127.0.0.1:18889/api/getStatus",
  CARD_INFO: "http://127.0.0.1:18889/api/readCert",
  DISCONNECT: "http://127.0.0.1:18889/api/disconnect",
};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error;
  }
);

var instance = axios.create({
  // baseURL: "http://www.zj-museum.com.cn:7002/",
  timeout: 5000,
});

function post(url, payload, onSuccess, onError) {
  payload = payload || {};
  instance.post(url, payload).then(function (response) {
    if (response.status === 200 && (response.data.state === 114 || response.data.state === 0)) {
      onSuccess(response.data);
    } else {
      onError(response.data.message);
    }
  });
}

function get(url, params, onSuccess) {
  instance.get(url, { params: params,}).then(function (response) {
      onSuccess(response);
    });
}

function certPost(url, onSuccess, onError) {
  instance.post(url, false).then(function (response) {
    if ( response.status === 200 && response.data.resultFlag === 0) {
      onSuccess(response.data);
    } else {
      onError(response.data.errorMsg);
    }
  });
}

//保存预约信息
function saveAppointInfo(params, onSuccess, onError) {
  post(API.SAVE_APPOINT_INFO, params, onSuccess, onError);
}

/**
 * 身份证识别仪接口
 */

//创建连接
function createConnect(onSuccess, onError) {
  certPost(API.CREATE_CONNECT, onSuccess, onError);
}

//获取状态
// function fetchReadCardStatus(onSuccess, onError) {
//   certPost(API.CRRD_STATUS, onSuccess, onError);
// }

//读卡信息
function getCardInfo(onSuccess, onError) {
  certPost(API.CARD_INFO, onSuccess, onError);
}

//断开连接
function disConnect(onSuccess, onError) {
  certPost(API.DISCONNECT, onSuccess, onError);
}
