const user_key = 'user_name';

export default class Auth {

  // Sets user details in localStorage
  setSession = (userName) => {
    localStorage.setItem(user_key, userName);
  }

  getSession = () => {
      return localStorage.getItem(user_key);
  }

  // removes user details from localStorage
  logout = () => {
    localStorage.removeItem(user_key);
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    let userName = localStorage.getItem(user_key);
    return userName!=null;
  }
}