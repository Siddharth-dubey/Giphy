const makePost = (url, data) => {
  const options = {
    method: "POST",
    data: JSON.stringify(data),
  };
  return fetch(url, options);
};
const makeGet = (url) => {
  return fetch(url);
};

export { makePost, makeGet };
