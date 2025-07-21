import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  User,
  Search,
  Tag,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles,
  Mail,
  Eye,
  Heart,
  Share,
  Filter,
} from "lucide-react";
import { Header } from "@/components/layout/Header";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to Diamond Grading: Understanding the 4Cs",
      excerpt:
        "Learn everything you need to know about diamond grading, including cut, clarity, color, and carat weight. This comprehensive guide will help you make informed decisions.",
      content:
        "Diamonds have captivated humans for centuries with their brilliance and beauty. Understanding how diamonds are graded is crucial for anyone looking to purchase or evaluate these precious stones...",
      author: "Dr. Sarah Mitchell",
      authorRole: "Chief Gemologist",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Education",
      tags: ["diamonds", "grading", "4cs", "certification"],
      featured: true,
      views: "2.4k",
      likes: "156",
      color: "from-blue-500 to-cyan-500",
      avatar: "SM",
    },
    {
      id: 2,
      title: "How to Identify Synthetic vs Natural Gemstones",
      excerpt:
        "With advancing technology, synthetic gemstones are becoming more sophisticated. Learn the key differences and identification techniques used by professionals.",
      content:
        "The gemstone market has seen a significant increase in synthetic stones that closely mimic their natural counterparts. As technology advances, distinguishing between natural and synthetic gems becomes increasingly challenging...",
      author: "Marcus Chen",
      authorRole: "Senior Analyst",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Technology",
      tags: ["synthetic", "natural", "identification", "technology"],
      featured: false,
      views: "1.8k",
      likes: "89",
      color: "from-purple-500 to-pink-500",
      avatar: "MC",
    },
    {
      id: 3,
      title: "Investment Potential of Colored Gemstones in 2024",
      excerpt:
        "Explore the current market trends for colored gemstones and which stones are showing the strongest investment potential this year.",
      content:
        "The colored gemstone market has shown remarkable resilience and growth over the past decade. Unlike diamonds, colored gemstones offer unique investment opportunities...",
      author: "Jennifer Walsh",
      authorRole: "Market Analyst",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Investment",
      tags: ["investment", "colored-gems", "market-trends", "2024"],
      featured: true,
      views: "3.2k",
      likes: "234",
      color: "from-emerald-500 to-teal-500",
      avatar: "JW",
    },
    {
      id: 4,
      title: "The History and Significance of Ruby Gemstones",
      excerpt:
        "Discover the rich history of rubies, from ancient civilizations to modern jewelry, and learn about their cultural significance across different societies.",
      content:
        "Rubies have been treasured throughout history, often called the 'king of gemstones.' Their deep red color has symbolized passion, protection, and prosperity across cultures...",
      author: "Dr. Amanda Ross",
      authorRole: "Historian & Gemologist",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "History",
      tags: ["ruby", "history", "culture", "significance"],
      featured: false,
      views: "1.5k",
      likes: "67",
      color: "from-red-500 to-pink-500",
      avatar: "AR",
    },
    {
      id: 5,
      title: "Understanding Gemstone Treatments and Enhancements",
      excerpt:
        "Learn about common gemstone treatments, why they're used, and how they affect the value and authenticity of precious stones.",
      content:
        "Gemstone treatments and enhancements are common practices in the jewelry industry. Understanding these processes is essential for both collectors and investors...",
      author: "Robert Kim",
      authorRole: "Treatment Specialist",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Education",
      tags: ["treatments", "enhancements", "value", "authenticity"],
      featured: false,
      views: "2.1k",
      likes: "98",
      color: "from-indigo-500 to-purple-500",
      avatar: "RK",
    },
    {
      id: 6,
      title: "Emerald Quality Factors: What Makes an Emerald Valuable",
      excerpt:
        "Dive deep into emerald evaluation criteria, including color, clarity, cut, and origin. Learn how to assess emerald quality like a professional.",
      content:
        "Emeralds are among the most prized gemstones, known for their vibrant green color. However, evaluating emerald quality requires understanding several unique factors...",
      author: "Lisa Thompson",
      authorRole: "Emerald Specialist",
      date: "2023-12-15",
      readTime: "8 min read",
      category: "Education",
      tags: ["emerald", "quality", "evaluation", "grading"],
      featured: false,
      views: "1.9k",
      likes: "76",
      color: "from-green-500 to-emerald-500",
      avatar: "LT",
    },
  ];

  const categories = [
    "All",
    "Education",
    "Technology",
    "Investment",
    "History",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  type LinkProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
  };
  const Link: React.FC<LinkProps> = ({ to, children, className }) => (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        console.log(`Navigate to: ${to}`);
      }}
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      <Header />
      <section className="relative z-10 ">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Gemstone Knowledge
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hub
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Stay informed with the latest insights, trends, and expert
              knowledge in the world of gemstones and jewelry authentication.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12 text-lg"
                />
              </div>

              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-slate-600" />
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                          : "hover:bg-white/70 border-slate-300"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2 text-slate-600">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">
                {filteredPosts.length} article
                {filteredPosts.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${post.color} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white/80" />
                  </div>

                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      {post.category}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Eye className="h-3 w-3 text-white" />
                      <span className="text-xs text-white">{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Heart className="h-3 w-3 text-white" />
                      <span className="text-xs text-white">{post.likes}</span>
                    </div>
                  </div>

                  {post.featured && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center text-sm text-slate-500 gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${post.color} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-xs">
                          {post.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">
                          {post.author}
                        </p>
                        <p className="text-xs text-slate-500">
                          {post.authorRole}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                      asChild
                    >
                      <Link to={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                No articles found
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try
                adjusting your filters or search terms.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="border-slate-300 hover:bg-blue-50 hover:border-blue-300"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Stay Updated</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Never Miss an Insight
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Subscribe to our newsletter and get the latest gemstone
                insights, market trends, and expert tips delivered to your inbox
                weekly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 h-12"
                />
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>5,000+ professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Weekly insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Expert tips</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
