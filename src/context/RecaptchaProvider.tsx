import { ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface RecaptchaProviderProps {
  children: ReactNode;
}

const RecaptchaProvider = ({ children }: RecaptchaProviderProps) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // If no site key is configured, render children without reCAPTCHA
  if (!siteKey || siteKey === 'your_recaptcha_site_key_here') {
    console.warn('reCAPTCHA site key not configured. Running without reCAPTCHA protection.');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaProvider;
