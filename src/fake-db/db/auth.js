import Mock from '../mock';

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE2OTU1NDUzMDZ9.52QDUHt6uW2h3G-w4m_jlC4u60u3aKSouszaVi3HQ8g';
const jwt = '7 days';

const userList = [
  {
    id: 1,
    role: '',
    name: '',
    username: '',
    email: '',
    avatar: '',
    age: 25
  }
];

// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    const { email } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (!user) return [400, { message: 'Invalid email or password' }];

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// Mock.onPost('/api/auth/register').reply((config) => {
//   try {
//     const { email, username } = JSON.parse(config.data);
//     const user = userList.find((u) => u.email === email);

//     if (user) return [400, { message: 'User already exists!' }];

//     const newUser = {
//       id: 2,
//       role: 'GUEST',
//       name: 'Unknown',
//       age: 25,
//       email: email,
//       username: username,
//       avatar: '/assets/images/face-6.jpg'
//     };

//     userList.push(newUser);

//     const payload = { user: { ...newUser } };
//     return [200, payload];
//   } catch (err) {
//     console.error(err);
//     return [500, { message: 'Internal server error' }];
//   }
// });

Mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = userList.find((u) => u.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
})
