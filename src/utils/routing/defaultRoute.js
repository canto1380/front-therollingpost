import { Redirect } from 'react-router-dom';
import userTypes from '../userType';

const DefaultRoute = ({ userType }) => {
  const defaultRoute = {default:'/'};
  switch (userType) {
  case userTypes.client:
    defaultRoute.default = '/';
    break;
  case userTypes.admin:
    defaultRoute.default = '/menu-categorias';
    break;
  case userTypes.notLogged:
    defaultRoute.default = '/';
    break;
  default:
    break;
  }
  return <Redirect to={defaultRoute.default} />;
};

export default DefaultRoute;
