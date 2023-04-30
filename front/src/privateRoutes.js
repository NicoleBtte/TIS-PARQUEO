import { Navigate, Route, Outlet, useLocation } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import DefaultLayout from './layouts/DefaultLayout';

export const PrivateRoutes = ({ children, theRol = '' }) => {
  const { token, rol } = useStateContext();
  let location = useLocation();
  //console.log('Hola probando si se ingresa a Private, el rol es', rol);

  if (!token || !rol) return <Navigate to='/login' state={{ from: location }} replace />;

  //console.log('Hola desde privateroutes, el rol es', rol);
  return rol === theRol ? (
    <DefaultLayout>
        <Outlet>{children}</Outlet>
    </DefaultLayout>
  ) : (
    <Navigate to='/login' replace />
  );
};

export default PrivateRoutes
