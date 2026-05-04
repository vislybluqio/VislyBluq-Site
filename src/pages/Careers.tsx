import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, MapPin, Clock, Code, Users } from 'lucide-react';

const Careers = () => {
    const positions = [
        {
            title: "Senior Full Stack Engineer",
            type: "Full-time",
            location: "Remote / Albany, GA",
            team: "Engineering",
            description: "We are looking for an experienced Full Stack Engineer (React/Node.js) to lead the development of enterprise-grade web applications for our clients.",
            tags: ["React", "Node.js", "TypeScript", "AWS"]
        },
        {
            title: "Data Engineer",
            type: "Full-time",
            location: "Remote",
            team: "Data",
            description: "Join our data team to build scalable ETL pipelines and data warehouses. You will work with the latest cloud technologies to help clients unlock their data potential.",
            tags: ["Python", "SQL", "Airflow", "Snowflake"]
        },
        {
            title: "UI/UX Designer",
            type: "Contract / Full-time",
            location: "Remote",
            team: "Design",
            description: "We need a visionary designer to create intuitive, beautiful, and accessible user interfaces for our web and mobile projects.",
            tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"]
        }
    ];

    return (
        <div className="pt-20 bg-white">
            {/* Hero Section */}
            <section className="bg-visly-dark py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-visly-navy opacity-50 transform skew-x-12 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-visly-blue opacity-10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-cyan px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-visly-blue/20">
                        <Users className="h-4 w-4" />
                        <span>JOIN THE TEAM</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                        Build the Future <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-visly-blue to-visly-cyan">
                            With VislyBluq.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        We are a team of builders, thinkers, and innovators. Join us to work on challenging
                        projects that make a real difference.
                    </p>
                </div>
            </section>

            {/* Values/Culture Mini-Section */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Code className="h-6 w-6 text-visly-blue" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Modern Tech Stack</h3>
                            <p className="text-gray-600 text-sm">We use the latest tools and frameworks. No legacy code maintenance here.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-6 w-6 text-visly-teal" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Remote-First</h3>
                            <p className="text-gray-600 text-sm">Work from where you are most productive. We value output, not hours in a chair.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="h-6 w-6 text-visly-navy" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Growth Budget</h3>
                            <p className="text-gray-600 text-sm">We provide an annual budget for courses, books, and conferences.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 bg-visly-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-visly-dark mb-4">
                            Open Positions
                        </h2>
                        <p className="text-gray-600">
                            Check out our current openings. Don't see a fit? <a href="mailto:odelolasolomon5@gmail.com" className="text-visly-blue font-bold hover:underline">Email us anyway.</a>
                        </p>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {positions.map((job, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-visly-blue bg-blue-50 px-2 py-1 rounded">
                                                {job.team}
                                            </span>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {job.type}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-visly-dark mb-3 group-hover:text-visly-blue transition-colors">
                                            {job.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {job.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag, i) => (
                                                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:self-center flex-shrink-0">
                                        <Link
                                            to={`/apply?job=${encodeURIComponent(job.title)}`}
                                            className="inline-flex items-center px-6 py-3 bg-visly-navy text-white rounded-full font-bold hover:bg-visly-blue transition-colors shadow-lg"
                                        >
                                            Apply Now
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
