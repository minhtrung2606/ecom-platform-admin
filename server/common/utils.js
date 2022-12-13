const createMapping = (arr = [], key = 'id') => {
  return arr.reduce(
    (mapping, obj) => {
      mapping[obj[key]] = obj;
      return mapping;
    },
    {},
  );
};

const createLogMessage = (actor, message) => {
  return `[${actor}]: ${message}`;
};

const CommonUtils = {
  createMapping,
  createLogMessage,
};

export default CommonUtils;
