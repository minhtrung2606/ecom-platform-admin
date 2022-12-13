import { createLogger, transports, format } from 'winston'
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, cid, timestamp }) => {
  return `${timestamp} [${level.toLocaleUpperCase()}][CID:${cid}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: '' }),
    timestamp(),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

const logByLevel = (level) => {
  /**
   * @returns {Number} CID to find in log
   */
  return (message) => {
    const cid = Date.now();
    logger.log({
      level,
      message,
      cid
    });
    return cid;
  };
};

const Logger = {
  info: logByLevel('info'),
  warn: logByLevel('warn'),
  error: logByLevel('error')
};

export default Logger;