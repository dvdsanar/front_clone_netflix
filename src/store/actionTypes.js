const actionCreator = (type, payload) => {
  return payload ? { type, payload } : { type };
};

export default actionCreator;
