const enum STORAGE_KEY {
  TOKEN = "token",
}

const getToken = () => {
  return localStorage.getItem(STORAGE_KEY.TOKEN);
};

const setToken = (token: string) => {
  localStorage.setItem(STORAGE_KEY.TOKEN, token);
};

export default {
  getToken,
  setToken,
};
