import { Page } from '@devugur/shared-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '../../store/features/user';

export const UserWrapper = (props: {
  children: any;
  sessionPaths: Page[];
}): JSX.Element => {
  const { children, sessionPaths } = props;

  const { pathname } = useLocation();
  const user = useUser();
  const navigate = useNavigate();

  const shouldRedirectToLogin =
    !user.loggedIn && !sessionPaths.map((x) => x.path).includes(pathname);

  useEffect(() => {
    if (shouldRedirectToLogin) {
      navigate('/login');
    }
  }, [shouldRedirectToLogin, navigate]);

  return <>{children}</>;
};
