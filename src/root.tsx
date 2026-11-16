import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/chat/ChatWidget';
import RecaptchaProvider from './context/RecaptchaProvider';
import { Section } from './components/site/Enterprise';
import './index.css';

export const Layout = ({ children }: { children: ReactNode }) => (
  // The inline script below adds a "js" class before hydration, hence suppressHydrationWarning.
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="UTF-8" />
      {/* Lets CSS hide fade-in content only when JavaScript will be there to reveal it. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__vbHydrated)document.documentElement.classList.remove('js')},4000)" }} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#171C26" />
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      {/* Switzer (text) and Gambetta Italic (headline emphasis) from Fontshare; Geist Mono (small labels) from Google Fonts. All free for commercial use. */}
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&f[]=gambetta@401&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const Shell = ({ children }: { children: ReactNode }) => (
  <RecaptchaProvider>
    <div className="flex min-h-screen flex-col bg-paper text-body">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  </RecaptchaProvider>
);

export default function App() {
  // Tells the inline script in <head> that the app is running, so scroll animations can stay on.
  useEffect(() => {
    (window as Window & { __vbHydrated?: boolean }).__vbHydrated = true;
  }, []);
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

/** Shown briefly for any URL that wasn't prerendered, while the app loads. */
export function HydrateFallback() {
  return <div className="min-h-screen bg-paper" />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <Shell>
      <Section className="pt-40">
        <p className="font-mono text-xs uppercase tracking-label text-body-faint">{notFound ? 'Error 404' : 'Error'}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-display sm:text-5xl">{notFound ? 'This page doesn’t exist.' : 'Something went wrong on this page.'}</h1>
        <Link to="/" className="mt-8 inline-flex text-sm font-medium text-brand hover:text-brand-hover">Go to the home page →</Link>
      </Section>
    </Shell>
  );
}
