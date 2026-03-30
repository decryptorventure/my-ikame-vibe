import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'https://keycloak.ikameglobal.com',
  clientId: 'ikame-sso',
  realm: 'ikame-platform',
});

const initKeycloak = (onAuthenticatedCallback: () => void | Promise<void>) => {
  keycloak
    .init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
    })
    .then(() => {
      return onAuthenticatedCallback();
    })
    .catch((e) => {
      console.error('Keycloak initialization error:', e);
      console.error('Failed to initialize authentication');
      return onAuthenticatedCallback();
    });
};

const getKeyCloack = () => keycloak;

const doLogin = keycloak.login;

const doLogout = keycloak.logout;

const getToken = () => keycloak.token;

const isLoggedIn = () => keycloak.authenticated;
// Check if token is valid or refresh it if expired
const refreshToken = async (): Promise<string | null | undefined> => {
  try {
    // Ensure Keycloak is initialized and authenticated
    if (!keycloak.authenticated) {
      throw new Error('User not authenticated');
    }

    await keycloak.updateToken(0);
    return keycloak?.token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};
const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getKeyCloack,
  refreshToken,
};

export default UserService;
