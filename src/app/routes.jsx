import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import Subcategories from './components/Master/Subcategories';
import BusinessTypes from './components/Master/BusinessTypes';
import Categories from './components/Master/Categories';
import ManageCurrencies from './components/Master/ManageCurrencies';
import DocumentTypes from './components/Master/DocumentType';
import DocumentCategories from './components/Master/DocumentCategories';
import DocumentSubCategories from './components/Master/DocumentSubCategories';
import Countries from './components/Master/Countries';
import State from './components/Master/State';
import City from './components/Master/City';
import Merchant from './components/ManageMerchant/Merchant';
import BlogCategory from './components/Manageweb/BlogCategory';
import Blog from './components/Manageweb/Blog';
import Services from './components/Manageweb/Services';
import About from './components/Manageweb/About';
import TermsCondition from './components/Manageweb/TermsCondition';





import Profile from './components/user/Profile';
import Managepassword from './components/user/Managepassword';
import Payment_gateway from './components/PaymentGateway/Payment_gateway';





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

      { path: '/master/subcategories', element: <Subcategories /> },
      { path: '/master/BusinessTypes', element: <BusinessTypes /> },
      { path: '/master/Categories', element: <Categories /> },
      { path: '/master/currency', element: <ManageCurrencies /> },
      { path: '/master/DocumentTypes', element: <DocumentTypes /> },
      { path: '/master/DocumentCategories', element: <DocumentCategories /> },
      { path: '/master/DocumentSubCategories', element: <DocumentSubCategories /> },
      { path: '/master/Countries', element: <Countries/> },
      { path: '/master/state', element: <State/> },
      { path: '/master/city', element: <City/> },
      { path: '/user/profile', element: <Profile /> },
      { path: '/user/Managepassword', element: <Managepassword /> },

      { path: '/PaymentGateway/Payment_gateway', element: <Payment_gateway /> },

      { path: '/ManageMerchant/merchant', element: <Merchant /> },
      { path: '/Manageweb/BlogCategory', element: <BlogCategory /> },
      { path: '/Manageweb/Blog', element: <Blog /> },
      { path: '/Manageweb/Services', element: <Services /> },
      { path: '/Manageweb/About', element: <About /> },
      { path: '/Manageweb/TermsCondition', element: <TermsCondition /> },


      
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
