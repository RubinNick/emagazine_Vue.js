import TokenService from "../tokenService";

const tokenService = new TokenService();

export function requestInterceptor(api, store) {
  console.log("store", store);
  //store.dispatch('showDialog');
  api.interceptors.request.use(request => {
    const token = tokenService.getToken();

    request.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    return request;
  });
}
