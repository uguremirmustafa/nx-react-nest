import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Page } from '@devugur/shared-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { UnauthLayout } from './unauth-layout';
import { Header, Sidebar } from '@devugur/webapp/ui-shared';
import {
  useGetProfileQuery,
  useLogoutMutation,
} from '../../store/features/auth';
import { useUser } from '../../store/features/user';
import useWindowSize from 'libs/utilities/src/lib/utility-hooks/use-window-size/use-window-size';

export interface LayoutProps {
  children: any;
  sessionPaths: Page[];
}

export function Layout(props: LayoutProps) {
  const { children, sessionPaths } = props;

  // hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const user = useUser();
  const [logoutMutation] = useLogoutMutation();
  useGetProfileQuery();

  // sidebar state
  const [sidebarActive, setSidebarActive] = useState(true);
  const toggleSidebar = () => {
    setSidebarActive((old) => !old);
  };

  const logout = async () => {
    try {
      await logoutMutation();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (width < 900) {
      setSidebarActive(false);
    } else {
      setSidebarActive(true);
    }
  }, [width]);

  useEffect(() => {
    if (width < 540) {
      setSidebarActive(false);
    }
  }, [pathname, width]);

  const isSessionPath = sessionPaths.map((x) => x.path).includes(pathname);

  if (isSessionPath) return <UnauthLayout>{children}</UnauthLayout>;

  return (
    <Box sx={{ bg: 'Background' }}>
      <Header
        user={user}
        logout={logout}
        toggleSidebar={toggleSidebar}
        sidebarActive={sidebarActive}
      />
      <Sidebar isActive={sidebarActive} activePath={pathname} />
      <Box
        className="main-content"
        sx={{
          p: 2,
          marginLeft: width < 540 ? 0 : sidebarActive ? '256px' : 0,
          transition: 'ease-in-out .3s margin',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
