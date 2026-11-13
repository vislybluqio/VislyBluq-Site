import type { ReactNode } from 'react';
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/chat/ChatWidget';
import NewsletterPopup from './components/site/NewsletterPopup';
import RecaptchaProvider from './context/RecaptchaProvider';
import { GlassCard, Section } from './components/site/Enterprise';
import './index.css';

export const Layout = ({ children }: { children: ReactNode }) => (
  // The inline script below adds a "js" class before hydration, hence suppressHydrationWarning.
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="UTF-8" />
      {/* Lets CSS hide fade-in content only when JavaScript will be there to reveal it. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0B1633" />
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
    <div className="enterprise-bg min-h-screen text-white">
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <NewsletterPopup />
    </div>
  </RecaptchaProvider>
);

export default function App() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

/** Shown briefly for any URL that wasn't prerendered, while the app loads. */
export function HydrateFallback() {
  return <div className="enterprise-bg min-h-screen" />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <Shell>
      <Section className="pt-32">
        <GlassCard className="p-10 text-center">
          <h1 className="text-3xl font-bold">{notFound ? 'Page not found' : 'Something broke on this page'}</h1>
          <Link to="/" className="mt-5 inline-flex text-[#adc6ff]">Back to the home page</Link>
        </GlassCard>
      </Section>
    </Shell>
  );
}
