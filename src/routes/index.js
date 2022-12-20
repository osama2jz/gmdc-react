// node_modules
import { Navigate, useRoutes } from 'react-router-dom';
// hooks
import routeNames from './routeNames';
import Loadable from '../components/Loadable';
import { lazy } from 'react';
import general from './general';

const Page404 = Loadable(lazy(() => import('../pages/Page404')));

const Routes = () => {
   return useRoutes([
      general,
      { path: '*', element: <Navigate to={routeNames.general.notFound} /> },
      { path: routeNames.general.notFound, element: <Page404 /> },
   ]);
};

export default Routes;