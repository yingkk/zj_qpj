const api = {
  SAVE_APPOINT_INFO: "external/appoint/saveTicketAppoint",
};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

var instance = axios.create({
  baseURL: "http://www.zj-museum.com.cn:7002/",
  timeout: 5000,
});

function post(url, payload = {}, onSucess, onError) {
  instance.post(url, payload).then(function (response) {
    if (response.status === 200 && (response.data.state === 114 || response.data.state === 0)) {
      onSucess(response.data);
    } else {
      onError(response.data.message);
    }
  });
}

function get(url, params, onSucess) {
  instance
    .get(url, {
      params: params,
    })
    .then(function (response) {
      onSucess(response);
    });
}

function saveAppointInfo(params, onSuccess, onError) {
  post(api.SAVE_APPOINT_INFO, params, onSuccess, onError);
}
