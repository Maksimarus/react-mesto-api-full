import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({component: Component, exact, ...props}) => {
  return (
    <Route exact={exact} path={props.path}>
      {props.isAuth ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
};

export default ProtectedRoute;
