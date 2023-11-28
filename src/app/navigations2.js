export const navigations2 = [
  { name: ' ADMIN Dashboard', path: '/dashboard/default', icon: 'dashboard' },
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
     
      { name: 'Branch', path: '/master/branch', iconText: 'F' },
      { name: 'Category', path: '/master/category', iconText: 'T' },
      { name: 'Sub Category', path: '/master/subcategory', iconText: 'T' },
      { name: 'Group', path: '/master/group', iconText: 'T' },
      { name: 'Sub Group', path: '/master/subgroup', iconText: 'T' },
      { name: 'Product', path: '/master/product', iconText: 'T' },
    ]
  },
  
  {
    name: 'Manage Member from super admin',
    icon: 'tag_faces',
    badge: { value: '', color: 'primary' },
    children: [
     
      { name: 'Add Member', path: '/member/add_member', iconText: 'F' },
    
      { name: 'All Member', path: '/member/all_member', iconText: 'T' }
    ]
  },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/'
  // }
];
