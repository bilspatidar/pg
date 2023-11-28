import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import Branch from './components/Master/Branch';
import Category from './components/Master/Category';
import SubCategory from './components/Master/SubCategory';
import Group from './components/Master/Group';
import SubGroup from './components/Master/SubGroup';
import Product from './components/Master/Product';
import AddMember from './components/member/AddMember';
import Profile from './components/user/Profile';
import Managepassword from './components/user/Managepassword';
   



// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
// const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
// const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
 
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },
      { path: '/', element: <Navigate to="dashboard/default" /> },

      // e-chart rooute
    
      { path: '/master/branch', element: <Branch /> },
      { path: '/master/category', element: <Category /> }, 
      { path: '/master/subcategory', element: <SubCategory /> },  
      { path: '/master/group', element: <Group /> },
      { path: '/master/subgroup', element: <SubGroup /> },  
      { path: '/master/product', element: <Product /> },  
      
      { path: '/member/addmember', element: <AddMember /> },

      { path: '/member/allmember', element: <Category /> },  
      { path: '/member/allmember', element: <Category /> },  
      { path: '/user/profile', element: <Profile />  },
      { path: '/user/Managepassword', element: <Managepassword />  },
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  // { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },


  { path: '*', element: <NotFound /> }
];

export default routes;
