import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CommonUtils from './utils';

const encrypt = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedValue = await bcrypt.hash(value, salt);
  return encryptedValue;
};

const compare = async (value, encryptedValue) => {
  const isMatched = await bcrypt.compare(value, encryptedValue);
  return isMatched;
};

const createToken = (data, privateKey) => {
  try {
    return jwt.sign(data, privateKey);
  } catch (e) {
    console.log(
      CommonUtils.createLogMessage(
        'Encryptor.JWT',
        `Cannot create JWT token for data(${data}) with key(${privateKey})`,
      ),
    );
    console.log(e.stack);
    return '';
  }
};

const verifyToken = (token, privateKey) => {
  try {
    return jwt.verify(token, privateKey)
  } catch (e) {
    console.log(
      CommonUtils.createLogMessage(
        'Encryptor.JWT',
        `Cannot verify JWT token(${token}) with key(${privateKey})`,
      ),
    );
    console.log(e.stack);
    return {};
  }
};

const Encryptor = {
  encrypt,
  compare,
  createToken,
  verifyToken,
};

export default Encryptor;
