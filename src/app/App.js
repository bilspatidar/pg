import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';

import React, { useEffect, useState } from 'react';
import {BASE_URL} from './config';

const App = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch(`${BASE_URL}/endpoint`)
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Error:', error));
//   }, []);
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
