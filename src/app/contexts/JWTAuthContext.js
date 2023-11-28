import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { MatxLoading } from 'app/components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import jwtDecode from 'jwt-decode';
const BASE_URL = 'https://c7cf-59-91-132-132.ngrok-free.app/';
const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false,
  usertype: 'superadmin'
};

const isValidToken = (accessToken) => {
  if (!accessToken) return false;

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      console.log(user);
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  // const login = async (email, password) => {
  //   const response = await axios.post('/api/auth/login', { email, password });
  //   const { user } = response.data;

  //   dispatch({ type: 'LOGIN', payload: { user } });
  // };
 const login = async (email, password) => {  
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed'); // Handle non-200 response
      }
  
      const data = await response.json();
      console.log(data)
      const  {token}  = data;
      console.log("data after login:", token); // ye isme ky data mi
      
      localStorage.setItem('accessToken', token);

      dispatch({ type: 'LOGIN', payload: { user:token } });

      // Redirect to dashboard on successful login
    navigate('/'); // Make sure to import and use useNavigate here
    toast.success('Login successful! Redirecting to the dashboard.');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login. Please try again.');
      // Handle any error that occurred during login
    }
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  };
  

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: "jfjsgj" } });
  //     } catch (err) {
  //       console.error(err);
  //       // dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
  //      // 
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!storedToken;
    console.log(isAuthenticated)
  
    if (isAuthenticated) {  
      dispatch({ type: 'INIT', payload: { isAuthenticated: true, user:storedToken } });
    } else {
      dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
    }
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
