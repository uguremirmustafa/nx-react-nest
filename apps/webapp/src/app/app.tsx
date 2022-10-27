// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { ErrorBoundary, Theme, Loader } from '@devugur/webapp/ui-shared';
import { Suspense } from 'react';
import { Layout } from './components/layout/layout';
import { AUTH_PAGES, UNAUTH_PAGES } from './pages';
import { UserWrapper } from './components/wrappers/UserWrapper';

export function App() {
  return (
    <UserWrapper sessionPaths={UNAUTH_PAGES}>
      <Theme>
        <Layout sessionPaths={UNAUTH_PAGES}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                {UNAUTH_PAGES.map(({ path, component: Component }) => {
                  return (
                    <Route key={path} path={path} element={<Component />} />
                  );
                })}
                {AUTH_PAGES.map(({ path, component: Component }) => {
                  return (
                    <Route key={path} path={path} element={<Component />} />
                  );
                })}
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </Layout>
      </Theme>
    </UserWrapper>
  );
}

export default App;
