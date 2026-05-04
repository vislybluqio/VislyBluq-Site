import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const featuredPost = {
    title: "The Future of AI in Business: 5 Trends to Watch in 2025",
    excerpt: "Explore the emerging AI trends that will reshape how businesses operate, from autonomous decision-making to ethical AI frameworks.",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "AI Trends"
  };

  const posts = [
    {
      title: "Building Scalable Data Pipelines with Apache Airflow",
      excerpt: "A comprehensive guide to designing and implementing robust data pipelines that can handle enterprise-scale workloads.",
      author: "Michael Rodriguez",
      date: "January 12, 2025",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Data Engineering"
    },
    {
      title: "Machine Learning Model Deployment: Best Practices",
      excerpt: "Learn how to successfully deploy ML models to production environments while maintaining performance and reliability.",
      author: "Emily Johnson",
      date: "January 10, 2025",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Machine Learning"
    },
    {
      title: "Data Visualization: Telling Stories with Your Data",
      excerpt: "Discover how to create compelling visualizations that communicate insights effectively to stakeholders.",
      author: "David Park",
      date: "January 8, 2025",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Business Intelligence"
    },
    {
      title: "Cloud Migration Strategy for Data Workloads",
      excerpt: "A step-by-step approach to successfully migrating your data infrastructure to the cloud.",
      author: "Sarah Chen",
      date: "January 5, 2025",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Cloud Computing"
    },
    {
      title: "Data Governance: Ensuring Quality and Compliance",
      excerpt: "Implement effective data governance frameworks to maintain data quality while meeting regulatory requirements.",
      author: "Michael Rodriguez",
      date: "January 3, 2025",
      readTime: "11 min read",
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Data Strategy"
    },
    {
      title: "Real-time Analytics: Processing Data at Scale",
      excerpt: "Explore technologies and architectures for implementing real-time analytics solutions.",
      author: "Emily Johnson",
      date: "December 28, 2024",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Analytics"
    }
  ];

  const categories = [
    "All Posts",
    "AI Trends",
    "Data Engineering",
    "Machine Learning",
    "Business Intelligence",
    "Cloud Computing",
    "Data Strategy",
    "Analytics"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="bg-visly-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-visly-blue opacity-10 transform skew-y-12"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-visly-navy opacity-20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Blog & <span className="text-visly-blue">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Stay ahead of the curve with our latest insights on data science, AI,
              and digital transformation trends shaping the future of business.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-100 mb-8 sticky top-20 z-20 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === category
                  ? 'bg-visly-blue text-white shadow-md transform scale-105'
                  : 'bg-visly-gray text-gray-600 hover:bg-gray-200 hover:text-visly-dark'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-visly-dark mb-2">Featured Article</h2>
              <p className="text-gray-600">Our latest best-in-class thinking</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-visly-cyan/10 text-visly-cyan px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featuredPost.date}
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-visly-dark mb-6 leading-tight group-hover:text-visly-blue transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-visly-gray flex items-center justify-center text-visly-dark font-bold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <span className="text-visly-dark font-bold block leading-none">{featuredPost.author}</span>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <span className="text-visly-blue font-bold flex items-center group-hover:translate-x-2 transition-transform">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden h-full min-h-[400px]">
                <div className="absolute inset-0 bg-visly-navy/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-visly-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-visly-dark mb-2">Latest Articles</h2>
            <p className="text-gray-600">Explore our collection of in-depth articles and tutorials</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full cursor-pointer">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <div className="absolute inset-0 bg-visly-navy/10 z-10 group-hover:opacity-0 transition-opacity"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-md text-visly-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-visly-dark mb-3 leading-tight group-hover:text-visly-blue transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 mb-6 leading-relaxed line-clamp-3 text-sm flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <span className="text-visly-dark font-semibold text-sm">{post.author}</span>
                    <span className="text-visly-blue/80 hover:text-visly-blue font-bold text-sm flex items-center">
                      Read
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-visly-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-visly-navy to-visly-dark"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-visly-blue opacity-5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Get the latest insights on data science, AI, and digital transformation
              delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-visly-blue bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm border border-white/10"
              />
              <button className="bg-visly-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-visly-cyan transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              We care about your data in our <Link to="/privacy" className="underline hover:text-white">privacy policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;