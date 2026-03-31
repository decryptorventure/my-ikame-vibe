import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider, Toaster } from '@frontend-team/ui-kit';
import { Provider } from 'react-redux';
import { ROUTES } from '@/constants';
import { ProtectedRoute, AppLayout, ErrorBoundary } from '@/components';
import Dashboard from '@/pages/Dashboard';
import IQuest from '@/pages/IQuest';
import Events from '@/pages/Events';
import EventDetail from '@/pages/Events/EventDetail';
import IReward from '@/pages/IReward';
import Profile from '@/pages/Profile';
import ICheck from '@/pages/ICheck';
import IGoal from '@/pages/IGoal';
import IWiki from '@/pages/IWiki';
import WelcomeScreen from '@/pages/Onboarding';
import OnboardingJourney from '@/pages/Onboarding/OnboardingJourney';
import UserDetail from '@/pages/UserDetail';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import { store } from '@/state/store';
import { AuthProvider } from '@/state/contexts/auth-context';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <div className="app-container">
                <Routes>
                  {/* Welcome screen — outside AppLayout (full-screen) */}
                  <Route path={ROUTES.ONBOARDING} element={<WelcomeScreen />} />

                  <Route
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.ONBOARDING_JOURNEY} element={<OnboardingJourney />} />
                    <Route path={ROUTES.IQUEST} element={<IQuest />} />
                    <Route path={ROUTES.EVENTS} element={<Events />} />
                    <Route path={ROUTES.EVENT_DETAIL} element={<EventDetail />} />
                    <Route path={ROUTES.IREWARD} element={<IReward />} />
                    <Route path={ROUTES.PROFILE} element={<Profile />} />
                    <Route path={ROUTES.ICHECK} element={<ICheck />} />
                    <Route path={ROUTES.IGOAL} element={<IGoal />} />
                    <Route path={ROUTES.IWIKI} element={<IWiki />} />
                    <Route path={ROUTES.USER_DETAIL} element={<UserDetail />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </div>
              <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
