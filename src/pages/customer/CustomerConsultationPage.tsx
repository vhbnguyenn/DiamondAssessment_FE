import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Calendar,
  Star,
  Phone,
  Mail,
  MapPin,
  User,
  Gem,
  Shield,
  Download,
  Upload,
  Eye,
  MoreVertical,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Heart,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";

interface ConsultationRequest {
  id: string;
  customerId: string;
  requestType: "assessment" | "consultation" | "sealing" | "certification";
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  requestDate: string;
  expectedDate?: string;
  assignedConsultant?: string;
  attachments?: string[];
  response?: string;
  rating?: number;
  feedback?: string;
}

interface Consultant {
  id: string;
  name: string;
  avatar?: string;
  specialization: string[];
  rating: number;
  totalConsultations: number;
  responseTime: string;
  status: "available" | "busy" | "offline";
  languages: string[];
}

const CustomerConsultationPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("new-request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [requestType, setRequestType] = useState("consultation");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [expectedDate, setExpectedDate] = useState("");
  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  // Mock data
  const [consultationRequests, setConsultationRequests] = useState<
    ConsultationRequest[]
  >([
    {
      id: "REQ001",
      customerId: "CUST001",
      requestType: "assessment",
      subject: "Diamond Ring Assessment",
      description:
        "I need professional assessment for my 2-carat diamond engagement ring. Please provide detailed analysis of the 4Cs.",
      priority: "high",
      status: "in_progress",
      requestDate: "2025-01-20",
      expectedDate: "2025-01-25",
      assignedConsultant: "Sarah Johnson",
      response:
        "Thank you for your request. Our expert gemologist will examine your diamond ring thoroughly. Please bring your ring to our office during business hours.",
      rating: 5,
    },
    {
      id: "REQ002",
      customerId: "CUST001",
      requestType: "consultation",
      subject: "Choosing Diamond for Engagement",
      description:
        "I'm looking for guidance on selecting the perfect diamond for an engagement ring. Budget is around $5000-7000.",
      priority: "medium",
      status: "completed",
      requestDate: "2025-01-15",
      expectedDate: "2025-01-18",
      assignedConsultant: "Mike Wilson",
      response:
        "Based on your budget and preferences, I recommend focusing on excellent cut quality with VS1-VS2 clarity and G-H color range. This will give you the best value and brilliance.",
      rating: 4,
      feedback:
        "Very helpful consultation. The consultant was knowledgeable and patient with all my questions.",
    },
    {
      id: "REQ003",
      customerId: "CUST001",
      requestType: "sealing",
      subject: "Diamond Sealing Service",
      description:
        "I need sealing service for my certified diamond before storage.",
      priority: "low",
      status: "pending",
      requestDate: "2025-01-22",
    },
  ]);

  const [consultants, setConsultants] = useState<Consultant[]>([
    {
      id: "CONS001",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      specialization: ["Diamond Assessment", "Gemology", "Certification"],
      rating: 4.9,
      totalConsultations: 1247,
      responseTime: "< 2 hours",
      status: "available",
      languages: ["English", "Vietnamese"],
    },
    {
      id: "CONS002",
      name: "Mike Wilson",
      avatar: "/avatars/mike.jpg",
      specialization: [
        "Diamond Selection",
        "Investment Advice",
        "Market Analysis",
      ],
      rating: 4.7,
      totalConsultations: 892,
      responseTime: "< 4 hours",
      status: "busy",
      languages: ["English", "Mandarin"],
    },
    {
      id: "CONS003",
      name: "Elena Rodriguez",
      avatar: "/avatars/elena.jpg",
      specialization: ["Jewelry Design", "Custom Settings", "Repair Services"],
      rating: 4.8,
      totalConsultations: 634,
      responseTime: "< 3 hours",
      status: "available",
      languages: ["English", "Spanish", "Vietnamese"],
    },
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      in_progress: "bg-blue-100 text-blue-700 border border-blue-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
      cancelled: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-700 border border-gray-200",
      medium: "bg-blue-100 text-blue-700 border border-blue-200",
      high: "bg-orange-100 text-orange-700 border border-orange-200",
      urgent: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      in_progress: RefreshCw,
      completed: CheckCircle,
      cancelled: AlertCircle,
    };
    return icons[status] || Clock;
  };

  const handleSubmitRequest = async () => {
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newRequest: ConsultationRequest = {
        id: `REQ${String(consultationRequests.length + 1).padStart(3, "0")}`,
        customerId: user?.id || "CUST001",
        requestType: requestType as any,
        subject,
        description,
        priority: priority as any,
        status: "pending",
        requestDate: new Date().toISOString().split("T")[0],
        expectedDate: expectedDate || undefined,
        assignedConsultant: selectedConsultant || undefined,
      };

      setConsultationRequests((prev) => [newRequest, ...prev]);

      // Reset form
      setSubject("");
      setDescription("");
      setPriority("medium");
      setExpectedDate("");
      setSelectedConsultant("");
      setAttachments([]);

      toast.success("Consultation request submitted successfully!");
      setActiveTab("my-requests");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredRequests = consultationRequests.filter((request) => {
    const matchesSearch =
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const availableConsultants = consultants.filter(
    (c) => c.status === "available"
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Consultation Center
          </h1>
          <p className="text-slate-600 mt-2">
            Get expert advice and professional consultation for your diamond
            needs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/70 hover:bg-white/90">
            <Download className="mr-2 h-4 w-4" />
            Download History
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            onClick={() => setActiveTab("new-request")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Requests
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {consultationRequests.length}
            </div>
            <p className="text-xs text-slate-600">All time submissions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              In Progress
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {
                consultationRequests.filter((r) => r.status === "in_progress")
                  .length
              }
            </div>
            <p className="text-xs text-slate-600">Currently being reviewed</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {
                consultationRequests.filter((r) => r.status === "completed")
                  .length
              }
            </div>
            <p className="text-xs text-slate-600">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Avg Response
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">2.5h</div>
            <p className="text-xs text-slate-600">Average response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-md">
          <TabsTrigger
            value="new-request"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </TabsTrigger>
          <TabsTrigger
            value="my-requests"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <FileText className="mr-2 h-4 w-4" />
            My Requests
          </TabsTrigger>
          <TabsTrigger
            value="consultants"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Consultants
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Live Chat
          </TabsTrigger>
        </TabsList>

        {/* New Request Tab */}
        <TabsContent value="new-request" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Submit New Consultation Request
              </CardTitle>
              <CardDescription>
                Describe your diamond consultation needs and our experts will
                assist you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="request-type">Request Type *</Label>
                  <select
                    id="request-type"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2"
                  >
                    <option value="consultation">General Consultation</option>
                    <option value="assessment">Diamond Assessment</option>
                    <option value="sealing">Sealing Service</option>
                    <option value="certification">Certification</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your consultation topic"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about your consultation needs, including any specific requirements or questions..."
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="expected-date">Expected Response Date</Label>
                  <Input
                    id="expected-date"
                    type="date"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultant">
                    Preferred Consultant (Optional)
                  </Label>
                  <select
                    id="consultant"
                    value={selectedConsultant}
                    onChange={(e) => setSelectedConsultant(e.target.value)}
                    className="w-full bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2"
                  >
                    <option value="">Auto-assign based on expertise</option>
                    {availableConsultants.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} - {c.specialization[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="mt-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                    >
                      Click to upload files
                    </label>
                    <p className="text-sm text-slate-500 mt-1">
                      Images, PDF, DOC files up to 10MB each
                    </p>
                  </div>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubject("");
                    setDescription("");
                    setPriority("medium");
                    setExpectedDate("");
                    setSelectedConsultant("");
                    setAttachments([]);
                  }}
                >
                  Clear Form
                </Button>
                <Button
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Filter className="h-5 w-5" />
                Filter Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Search by subject, ID, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-filter">Status</Label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              return (
                <Card
                  key={request.id}
                  className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {request.subject}
                          </h3>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(request.requestDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {request.id}
                          </span>
                          {request.assignedConsultant && (
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {request.assignedConsultant}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {request.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Request
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Contact Consultant
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">{request.description}</p>

                    {request.response && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-medium text-slate-800 mb-2">
                          Consultant Response:
                        </h4>
                        <p className="text-slate-600">{request.response}</p>
                      </div>
                    )}

                    {request.status === "completed" && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">
                            Rate this consultation:
                          </span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (request.rating || 0)
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Leave Feedback
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Consultants Tab */}
        <TabsContent value="consultants" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Expert Consultants
              </CardTitle>
              <CardDescription>
                Meet our team of certified diamond experts ready to assist you
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {consultants.map((consultant) => (
              <Card
                key={consultant.id}
                className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                      <AvatarImage src={consultant.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-semibold">
                        {consultant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {consultant.name}
                        </h3>
                        <Badge
                          className={
                            consultant.status === "available"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : consultant.status === "busy"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }
                        >
                          {consultant.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(consultant.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-slate-600 ml-1">
                          {consultant.rating} ({consultant.totalConsultations}{" "}
                          reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">
                      Specializations
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {consultant.specialization.map((spec, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-slate-100"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Response Time:</span>
                      <p className="font-medium text-slate-800">
                        {consultant.responseTime}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600">Languages:</span>
                      <p className="font-medium text-slate-800">
                        {consultant.languages.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-200/50">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={consultant.status !== "available"}
                      onClick={() => {
                        setSelectedConsultant(consultant.name);
                        setActiveTab("new-request");
                        toast.success(
                          `${consultant.name} selected as preferred consultant`
                        );
                      }}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Consult
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Live Chat Support
              </CardTitle>
              <CardDescription>
                Get instant help from our customer support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Chat Support
                    </h3>
                    <p className="text-slate-600">
                      Connect with our support team for immediate assistance
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>3 agents online</span>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Help Topics */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Quick Help Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: Gem,
                    title: "Diamond Assessment",
                    desc: "Learn about our assessment process",
                  },
                  {
                    icon: Shield,
                    title: "Certification",
                    desc: "Understand certification standards",
                  },
                  {
                    icon: FileText,
                    title: "Documentation",
                    desc: "Help with paperwork and forms",
                  },
                  {
                    icon: Calendar,
                    title: "Scheduling",
                    desc: "Book appointments and consultations",
                  },
                  {
                    icon: Phone,
                    title: "Contact Info",
                    desc: "Find our contact details",
                  },
                  {
                    icon: Star,
                    title: "Service Quality",
                    desc: "Feedback and service ratings",
                  },
                ].map((topic, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border border-slate-200 hover:border-blue-300"
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <topic.icon className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium text-slate-800">
                          {topic.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-600">{topic.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">
                      Phone Support
                    </h4>
                    <p className="text-sm text-slate-600">+84 28 1234 5678</p>
                    <p className="text-xs text-slate-500">Mon-Fri 8AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">
                      Email Support
                    </h4>
                    <p className="text-sm text-slate-600">
                      support@diamond.com
                    </p>
                    <p className="text-xs text-slate-500">24/7 Response</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Visit Us</h4>
                    <p className="text-sm text-slate-600">
                      123 Diamond St, District 1
                    </p>
                    <p className="text-xs text-slate-500">Ho Chi Minh City</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerConsultationPage;
