import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { MatxLoading } from 'app/components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import jwtDecode from 'jwt-decode';
const BASE_URL = 'https://cp.sparkhub.in/';
const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false,
  user_type: null
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
    axios.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user, user_type } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user_type };
    }

    case 'LOGIN': {
      const { user, user_type } = action.payload;
      console.log(user);
      return { ...state, isAuthenticated: true, user, user_type };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null, user_type: null };
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
      const response = await fetch(`${BASE_URL}api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Shorthand for { email: email, password: password }
      });

      if (!response.ok) {
        throw new Error('Login failed'); // Handle non-200 response
      }

      const data = await response.json();
      const token = data.access_token; // Access the token directly from data

      console.log('data after login:', token);
      // user_type
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userData', data.user_type);

      // Assuming dispatch is defined elsewhere and accessible here
      dispatch({ type: 'LOGIN', payload: { user: token, user_type: data.user_type } });

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
    const userData = localStorage.getItem('userData');

    const isAuthenticated = !!storedToken;
    console.log(isAuthenticated);

    if (isAuthenticated) {
      dispatch({
        type: 'INIT',
        payload: { isAuthenticated: true, user: storedToken, user_type: userData }
      });
    } else {
      dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null, user_type: null } });
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
