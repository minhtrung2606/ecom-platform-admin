import { useRouteError } from "react-router-dom";

const RouterErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p><span><a href="/">Go to Dashboard</a></span></p>
    </div>
  );
};

export default RouterErrorPage;
