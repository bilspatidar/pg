import React, { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled } from '@mui/material';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { navigations2 } from 'app/navigations2';
import { navigations3 } from 'app/navigations3';
import useAuth from 'app/hooks/useAuth';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative'
}));
const isDocs = true;
const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' }
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { user_type } = useAuth();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {user_type === 'superadmin' && <MatxVerticalNav items={navigations} />}
        {user_type === 'merchant' && <MatxVerticalNav items={navigations2} />}
        {user_type === 'user' && <MatxVerticalNav items={navigations3} />}
      
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
