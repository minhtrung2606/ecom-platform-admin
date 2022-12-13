import { useCallback, useState } from 'react';

const LoginForm = ({
  isDoingLogin,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = useCallback((e) => setEmail(e.target?.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target?.value), []);
  const handleSubmitLogin = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(email, password);
  }, [onSubmit, email, password]);

  return (
    <div id="login-form" className="login-form">
      <form onSubmit={handleSubmitLogin} disabled={isDoingLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email / Number</label>
          <input
            id="email"
            name="email"
            className="form-control"
            type="text"
            disabled={isDoingLogin}
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            type="password"
            disabled={isDoingLogin}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isDoingLogin}
            className="btn btn-primary form-control"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
