export const navigations = [
  { name: 'Super admin Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' }
  //   ]
  // },
  {
    name: 'Master',
    icon: 'settings',

    badge: { value: '', color: 'primary' },
    children: [


      { name: 'Business Types', path: '/master/businesstypes', iconText: 'T' },
      { name: 'Categories', path: '/master/categories', iconText: 'T' },
      { name: ' Sub Categories', path: '/master/Subcategories', iconText: 'F' },
      { name: 'Manage Currencies', path: '/master/currency', iconText: 'T' },
      // { name: 'Document Types', path: '/master/documenttypes', iconText: 'T' },
      { name: 'Document Categories', path: '/master/documentcategories', iconText: 'T' },
      { name: 'Document Sub Categories', path: '/master/DocumentSubCategories', iconText: 'T' },
      { name: 'Countries', path: '/master/countries', iconText: 'T' },
      { name: 'State', path: '/master/state', iconText: 'T' },
      { name: 'City', path: '/master/city', iconText: 'T' },
    ]
  },
 
  {
    name: 'Payment Gateway',
    icon: 'settings',

    badge: { value: '', color: 'primary' },
    children: [


      { name: 'Payment Gateway', path: '/PaymentGateway/Payment_gateway', iconText: 'T' },
    

    ]
  },
  {
    name: 'Manage Web',
    icon: 'settings',

    badge: { value: '', color: 'primary' },
    children: [


      { name: 'Blog Category', path: '/Manageweb/BlogCategory', iconText: 'T' },
      { name: 'Blog', path: '/Manageweb/Blog', iconText: 'T' },
      { name: 'Services', path: '/Manageweb/Services', iconText: 'T' },
      { name: 'About', path: '/Manageweb/About', iconText: 'T' },
      { name: 'Terms & Condition', path: '/Manageweb/TermsCondition', iconText: 'T' },
      { name: 'Privacy Policies', path: '/Manageweb/PrivacyPolicies', iconText: 'T' },
      { name: 'Refund Policy', path: '/Manageweb/RefundPolicy', iconText: 'T' },
      { name: 'Cancellation', path: '/Manageweb/Cancellation', iconText: 'T' },
      { name: 'Contact Us', path: '/Manageweb/ContactUs', iconText: 'T' },
      { name: 'Faq', path: '/Manageweb/Faq', iconText: 'T' },
    

    ]
  },
  {
    name: 'Manage Merchant',
    icon: 'settings',

    badge: { value: '', color: 'primary' },
    children: [


      { name: 'Merchant', path: '/ManageMerchant/Merchant', iconText: 'T' },
      { name: 'Merchant keys list', path: '/ManageMerchant/Merchantkeyslist', iconText: 'T' },
    

    ]
  },
  // {
  //   name: 'Manage Member',
  //   icon: 'tag_faces',
  //   badge: { value: '', color: 'primary' },
  //   children: [
     
  //     { name: 'Add Member', path: '/member/addmember', iconText: 'F' },
    
  //     { name: 'All Member', path: '/member/all_member', iconText: 'T' }
  //   ]
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/'
  // }
];
