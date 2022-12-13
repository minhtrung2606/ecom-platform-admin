import axios from 'axios';
import { useCallback, useState } from 'react';
import axiosUtils from '../common/axiosUtils';
import BaseError from '../common/BaseError';

const useApiCallState = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const sendApi = useCallback(
    async ({ method, apiUrl, payload }) => {
      // Clean up state before sending
      setError('');
      setIsSending(true);

      try {
        const resp = await axios[method](
          apiUrl,
          payload,
        );
        const { isSuccess, msg } = resp.data;
        if (isSuccess) {
          setIsSuccess(isSuccess);
        } else {
          throw new BaseError(msg || 'Cannot update or create product');
        }
      } catch (e) {
        const errMsg = axiosUtils.getRequestErrorMessage(e);
        setError(errMsg);
        setIsSuccess(false);
      } finally {
        setIsSending(false);
      }
    },
    [],
  );

  return {
    isSending,
    isSuccess,
    error,
    sendApi,
  };
};

export default useApiCallState;
