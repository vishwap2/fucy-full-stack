import { lazy } from 'react';
// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';



// sample page routing
// const Home = Loadable(lazy(() => import('../views/Landing')));
const MainCanvas = Loadable(lazy(() => import('../views/MainCanvas')));
const Career = Loadable(lazy(()=>import('../views/CareerPage')));
const ErrorPage = Loadable(lazy(()=>import('../views/ErrorPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        // {
        //     path: '/',
        //     element: <Home />
        // },
        {
            path: '/',
            element: <MainCanvas />
        },
        {
            path: '/Modals/:id',
            element: <MainCanvas />
        },
        {
            path: '/career',
            element: <Career />
        },
        {
            path: '/#',
            element: <ErrorPage />
        },
       
    ]
};

export default MainRoutes;
