import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    console.log(e);
    return '';
  }
};

const verifyToken = (token, privateKey) => {
  try {
    return jwt.verify(token, privateKey)
  } catch (e) {
    console.log(e);
    return {};
  }
};

const EncryptorLib = {
  encrypt,
  compare,
  createToken,
  verifyToken,
};

export default EncryptorLib;
