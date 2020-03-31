import router from "../router/index";

export default class TokenService {
  setUser(user) {
    const stringifyUser = JSON.stringify(user);

    localStorage.setItem("user", stringifyUser);
  }

  removeUser() {
    localStorage.removeItem("user");
    router.push({ name: "LoginPage" });
  }

  getToken() {
    let token = null;
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      token = user.access_token;
    }

    return token;
  }

  isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.userRole;

    if (role === 0) {
      return true;
    } else {
      return false;
    }
  }
}
