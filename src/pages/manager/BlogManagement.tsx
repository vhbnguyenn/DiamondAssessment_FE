import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PenSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: "draft" | "published" | "archived";
  publishDate?: string;
  views: number;
}

const BlogManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const mockBlogPosts: BlogPost[] = [
      {
        id: "BLG001",
        title: "Guide to Diamond Selection",
        author: "Nguyen Van A",
        status: "draft",
        views: 0,
      },
      {
        id: "BLG002",
        title: "2025 Diamond Trends",
        author: "Tran Thi B",
        status: "published",
        publishDate: "2025-07-24",
        views: 150,
      },
      {
        id: "BLG003",
        title: "History of Gemology",
        author: "Le Van C",
        status: "archived",
        publishDate: "2025-07-23",
        views: 300,
      },
    ];
    setBlogPosts(mockBlogPosts);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      published: "bg-green-100 text-green-700 border border-green-200",
      archived: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.draft;
  };

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePublishPost = (postId: string) => {
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              status: "published",
              publishDate: new Date().toISOString(),
            }
          : post
      )
    );
    toast.success("Post published successfully!");
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-once">
          Blog Management
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by title, author, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/80 border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={() => setBlogPosts((prev) => [...prev])}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-2xl">
            Blog Posts Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-slate-50/70">
                <TableHead className="text-left">Post ID</TableHead>
                <TableHead className="text-left">Title</TableHead>
                <TableHead className="text-left">Author</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Publish Date</TableHead>
                <TableHead className="text-left">Views</TableHead>
                <TableHead className="text-left">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    <div className="animate-spin">
                      <Clock className="h-8 w-8 text-gray-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredBlogPosts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-4 text-gray-500"
                  >
                    No blog posts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBlogPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="hover:bg-slate-100 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{post.id}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {post.publishDate
                        ? new Date(post.publishDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell>
                      {post.status === "draft" && (
                        <Button
                          size="sm"
                          onClick={() => handlePublishPost(post.id)}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Publish
                        </Button>
                      )}
                      {(post.status === "published" ||
                        post.status === "archived") && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                          disabled
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;
