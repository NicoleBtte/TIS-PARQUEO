import { createBrowserRouter, Navigate } from 'react-router-dom';

import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import ConvocatoriaPage from './components/convocatoriaPage';
import ParqueoPage from './components/parqueoPage';
import NotFound from './components/notFoundPage';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to='/convocatoria' />,
			},
			{
				path: '/convocatoria',
				element: <ConvocatoriaPage />,
			},
			{
				path: '/parqueo',
				element: <ParqueoPage />,
			}
		],
	},
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/register',
				element: <HomePage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
