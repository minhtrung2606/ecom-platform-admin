import { Suspense } from 'react';

const Loading = () => (
  <div className="error-page vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
    Loading...
  </div>
);

const SuspendedComp = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
};

export default SuspendedComp;
