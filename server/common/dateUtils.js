import moment from 'moment';

const getMariaDbCurrentTimestamp = () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

export default {
  getMariaDbCurrentTimestamp,
};
