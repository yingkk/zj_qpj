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
  baseURL: "http://10.10.200.11:8080",
  timeout: 5000,
});

function post(url, payload = {}, onSucess, onError) {
  instance.post(url, payload).then(function (response) {
    if (response.status === 200) {
      onSucess(response.data);
    } else {
      onError(response.message);
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
