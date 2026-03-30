import ReactDOM from 'react-dom/client';
import { Toaster } from '@frontend-team/ui-kit';
import '@frontend-team/ui-kit/style.css';
import '@frontend-team/tiptap-kit/styles.css';
import UserService from '@/lib/keycloak-config';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const renderApp = async () => {
  root.render(
    <>
      <App />
      <Toaster position="bottom-right" />
    </>
  );
};

if (import.meta.env.VITE_USE_MOCK !== 'false') {
  renderApp();
} else {
  UserService.initKeycloak(renderApp);
}
