const processDbBindParamValue = (value) => {
  if (value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
};

const DBUtil = {
  processDbBindParamValue,
};

export default DBUtil;
