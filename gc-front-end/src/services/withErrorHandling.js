const handle401Error = () => {
  localStorage.removeItem(`user`);
  document.dispatchEvent(new CustomEvent("401Error"));
};

const withErrorHandling = async (apiCall) => {
  try {
    return await apiCall();
  } catch (err) {
    if (err?.response?.status === 401) handle401Error();
    throw err?.response?.data ?? err;
  }
};

export default withErrorHandling;
