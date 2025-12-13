import { useState, useEffect } from 'react';

interface FacebookUser {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

interface UseFacebookAuthReturn {
  isAuthenticated: boolean;
  user: FacebookUser | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export const useFacebookAuth = (appId: string): UseFacebookAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<FacebookUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!appId || appId === 'YOUR_FACEBOOK_APP_ID') {
      setIsLoading(false);
      return;
    }

    const fetchUserInfo = () => {
      if (window.FB) {
        window.FB.api('/me', { fields: 'id,name,email,picture' }, (response: FacebookUser | { error?: any }) => {
          if (response && !('error' in response)) {
            setUser(response as FacebookUser);
          }
        });
      }
    };

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      if (window.FB) {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });

        // Check login status
        window.FB.getLoginStatus((response: any) => {
          if (response.status === 'connected') {
            setIsAuthenticated(true);
            fetchUserInfo();
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
          setIsLoading(false);
        });
      }
    };

    // Load Facebook SDK if not already loaded
    if (window.FB) {
      // SDK already loaded, trigger initialization
      window.fbAsyncInit();
    } else {
      // Load the SDK script
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.fbAsyncInit) {
          window.fbAsyncInit();
        }
      };
      document.body.appendChild(script);
    }
  }, [appId]);

  const login = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!window.FB) {
        reject(new Error('Facebook SDK not loaded'));
        return;
      }
      
      window.FB.login((response: any) => {
        if (response.authResponse) {
          setIsAuthenticated(true);
          window.FB.api('/me', { fields: 'id,name,email,picture' }, (userResponse: FacebookUser | { error?: any }) => {
            if (userResponse && !('error' in userResponse)) {
              setUser(userResponse as FacebookUser);
            }
          });
          resolve();
        } else {
          reject(new Error('User cancelled login or did not fully authorize.'));
        }
      }, { scope: 'email,public_profile' });
    });
  };

  const logout = () => {
    window.FB.logout(() => {
      setIsAuthenticated(false);
      setUser(null);
    });
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};

