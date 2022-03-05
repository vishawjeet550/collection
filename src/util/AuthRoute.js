/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

// eslint-disable-next-line react/prop-types
function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  )
}

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (!user ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  )
}

export default AuthRoute;
