import { useCallback } from 'react';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';
import Hooks from '../../hooks';
import './styles.css';

const loginPageBtClasses = 'vh-100 d-flex flex-column align-items-center justify-content-start login-page';

const LoginPage = () => {
  const {
    isSending,
    isSuccess,
    error,
    sendApi,
  } = Hooks.useApiCallState();

  const handleSubmit = useCallback((email, password) => sendApi({
    method: 'post',
    apiUrl: '/api/v1/users/login',
    payload: { email, password },
  }), [sendApi]);

  if (isSuccess) {
    return (<Navigate to="/" />);
  }

  return (
    <div id="login-page" className={loginPageBtClasses}>
      <h1 className="mt-5 mb-5 text-center">Login Page</h1>
      {!!error && (<p className="alert alert-danger">{error}</p>)}
      <LoginForm
        isDoingLogin={isSending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginPage;
