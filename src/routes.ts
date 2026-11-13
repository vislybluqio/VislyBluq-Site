import { type RouteConfig, index, route } from '@react-router/dev/routes';

// Removed pages (projects, blog, industries, focus) redirect in vercel.json.
export default [
  index('pages/Home.tsx'),
  route('about', 'pages/About.tsx'),
  route('team', 'pages/Team.tsx'),
  route('services', 'pages/Services.tsx'),
  route('services/:serviceId', 'pages/ServiceDetail.tsx'),
  route('contact', 'pages/Contact.tsx'),
  route('careers', 'pages/Careers.tsx'),
  route('privacy', 'pages/Privacy.tsx'),
  route('terms', 'pages/Terms.tsx'),
  route('faq', 'pages/FAQ.tsx'),
  route('apply', 'pages/Apply.tsx'),
] satisfies RouteConfig;
