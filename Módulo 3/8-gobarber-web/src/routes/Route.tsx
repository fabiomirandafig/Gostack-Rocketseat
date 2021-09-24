import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { User } = useAuth();

  return (
    <ReactDOMRoute
      {... rest}
      render={({ location }) => (isPrivate === !!User ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }} />
      ))}
    />
  );
};

export default Route;

// rota é privada e o usuário está autenticado = OK
// rota é privada e o usuário não está autenticado = Redirecionar ele pro login
// rota não é privada e o usuário está autenticado = Redireciona para o dashboard
// rota não é privada e o usuário não está autenticado = OK
