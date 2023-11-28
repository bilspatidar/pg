import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;

// import React, { useContext } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import useAuth from 'app/hooks/useAuth';

// const AuthGuard = () => {
//   // const authContext = useContext(AuthContext);
//   const { isAuthenticated, user } = useAuth();

//   if (!isAuthenticated || user === null) {
//     return <Navigate to="/session/login" />; // Redirect to login if not authenticated or user is null
//   }

//   return <Outlet />;
// };

// export default AuthGuard;
