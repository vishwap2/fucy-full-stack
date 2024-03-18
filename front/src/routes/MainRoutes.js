import { lazy } from 'react';
// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import Edit from '../views/Edit';


// sample page routing
const Home = Loadable(lazy(() => import('../views/Home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/Modals/:id',
            element: <Edit />
        },
       
    ]
};

export default MainRoutes;
