import { lazy } from 'react';
import Loadable from '../ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
import RequireAuth from './Protected';

const Home = Loadable(lazy(() => import('../views/HomePage')));
const MainCanvas = Loadable(lazy(() => import('../views/MainCanvas')));
const Career = Loadable(lazy(() => import('../views/CareerPage')));
const Contact = Loadable(lazy(() => import('../views/ContactPage')));
const About = Loadable(lazy(() => import('../views/AboutPage')));

// const ErrorPage = Loadable(lazy(()=>import('../views/ErrorPage')));

const commonRoutes = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/career',
        element: <Career />
    },
    {
        path: '/contact',
        element: <Contact />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/Modals',
        element: <MainCanvas />
    },

    {
        path: '/Modals/:id',
        element: <MainCanvas />
    }
];

// const finialisedRoute = (routes = commonRoutes) => {

//   let finalRoute = [];
//   routes &&
//     routes?.forEach((route) => {
//       if (route.path === '*') {
//         finalRoute.push({
//           path: '*',
//           element: route.element
//         });
//       }
//     });

//   return finalRoute;
// };

const MainRoutes = {
    path: '/',
    element: (
        <RequireAuth>
            <MainLayout />
        </RequireAuth>
    ),
    children: commonRoutes
};

export default MainRoutes;
