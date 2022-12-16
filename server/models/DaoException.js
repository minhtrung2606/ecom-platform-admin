class DaoException extends Error {
  constructor(mysql2Exception) {
    super();
    const {
      message,
      errno,
      code,
      sqlState,
      sqlMessage,
    } = mysql2Exception;
    this.message = message;
    this.errorNo = errno;
    this.code = code;
    this.sqlState = sqlState;
    this.sqlMessage = sqlMessage;
  }
}

export default DaoException;
