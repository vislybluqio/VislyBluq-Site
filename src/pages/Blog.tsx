import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const featuredPost = {
    title: 'The Future of AI in Business: 5 Trends to Watch in 2025',
    excerpt:
      'Emerging AI trends reshaping how businesses operate, from autonomous decision-making to ethical AI.',
    author: 'Sarah Chen',
    date: 'January 15, 2025',
    readTime: '8 min read',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'AI Trends',
  };

  const posts = [
    {
      title: 'Building Scalable Data Pipelines with Apache Airflow',
      excerpt: 'Designing robust data pipelines for enterprise-scale workloads.',
      author: 'Michael Rodriguez',
      date: 'Jan 12, 2025',
      readTime: '12 min',
      image:
        'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Data Engineering',
    },
    {
      title: 'Machine Learning Model Deployment: Best Practices',
      excerpt: 'Deploy ML models to production while maintaining reliability.',
      author: 'Emily Johnson',
      date: 'Jan 10, 2025',
      readTime: '10 min',
      image:
        'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Machine Learning',
    },
    {
      title: 'Data Visualization: Telling Stories with Your Data',
      excerpt: 'Create compelling visualizations that communicate insights.',
      author: 'David Park',
      date: 'Jan 8, 2025',
      readTime: '6 min',
      image:
        'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Business Intelligence',
    },
    {
      title: 'Cloud Migration Strategy for Data Workloads',
      excerpt: 'A step-by-step approach to migrating data infrastructure.',
      author: 'Sarah Chen',
      date: 'Jan 5, 2025',
      readTime: '9 min',
      image:
        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Cloud Computing',
    },
    {
      title: 'Data Governance: Ensuring Quality and Compliance',
      excerpt: 'Frameworks to maintain data quality and meet regulations.',
      author: 'Michael Rodriguez',
      date: 'Jan 3, 2025',
      readTime: '11 min',
      image:
        'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Data Strategy',
    },
    {
      title: 'Real-time Analytics: Processing Data at Scale',
      excerpt: 'Technologies for implementing real-time analytics.',
      author: 'Emily Johnson',
      date: 'Dec 28, 2024',
      readTime: '8 min',
      image:
        'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Analytics',
    },
  ];

  const categories = [
    'All Posts',
    'AI Trends',
    'Data Engineering',
    'Machine Learning',
    'Business Intelligence',
    'Cloud Computing',
    'Data Strategy',
    'Analytics',
  ];

  const filtered =
    activeCategory === 'All Posts'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-16 bg-white">
      <PageHero
        title={
          <>
            Blog & <span className="text-visly-cyan">Insights</span>
          </>
        }
        subtitle="Latest thinking on data science, AI, and digital transformation."
      />

      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-visly-navy text-white'
                    : 'bg-visly-gray text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Section bg="white" className="!pt-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Featured
        </p>
        <Card className="!p-0 overflow-hidden" hover>
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold text-visly-cyan uppercase mb-2">
                {featuredPost.category}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold text-visly-dark mb-3 leading-snug">
                {featuredPost.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                <span>{featuredPost.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featuredPost.readTime}
                </span>
              </div>
            </div>
            <div className="h-48 md:h-auto md:min-h-[220px]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Card>
      </Section>

      <Section bg="gray">
        <h2 className="text-xl font-semibold text-visly-dark mb-6">Latest articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => (
            <Card key={index} hover className="!p-0 overflow-hidden flex flex-col">
              <div className="h-40 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-visly-dark px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex gap-3 text-xs text-gray-400 mb-2">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-semibold text-visly-dark mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
                <p className="text-xs text-visly-blue font-medium mt-4 flex items-center">
                  Read <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section bg="dark">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-2">Stay updated</h2>
          <p className="text-sm text-gray-400 mb-6">
            Weekly insights on data science and AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-visly-blue"
            />
            <button
              type="button"
              className="bg-visly-blue text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-visly-cyan transition-colors"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            See our{' '}
            <Link to="/privacy" className="underline hover:text-white">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </Section>
    </div>
  );
};

export default Blog;
