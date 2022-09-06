
export let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken};
