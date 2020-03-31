import store from "../../store/store";

export const responseInterceptor = api => {
  //store.dispatch('showDialog');
  api.interceptors.response.use(
    response => {
      const data = response.data;

      if(data.message) {
        const message = data.message;

        store.dispatch("showSnackbar", message)
      }

      return response;
    },
    error => {
      let message = error.response.data;

      if (error.response.status == 401) {
        message = "Please, sign in";
        store.dispatch("logout");
      }

      store.dispatch("showSnackbar", message);
      return Promise.reject(error);
    }
  );
};
