
export let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export default { setToken};
