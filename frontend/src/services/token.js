/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken };
