import { lazy } from 'react';
// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import MainCanvas from '../views/MainCanvas';


// sample page routing
const Home = Loadable(lazy(() => import('../views/MainCanvas')));

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
            element: <MainCanvas />
        },
       
    ]
};

export default MainRoutes;
