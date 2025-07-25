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
import {
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  FileText,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Share2,
  MoreVertical,
  Gem,
  Award,
  QrCode,
  ExternalLink,
  RefreshCw,
  Plus,
  Bookmark,
  Mail,
  Copy,
  Image as ImageIcon,
  Paperclip,
  MapPin,
  User,
  Building,
  Phone,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

interface DiamondCertificate {
  id: string;
  certificateNumber: string;
  requestId: string;
  customerId: string;
  diamondId: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expired" | "revoked" | "pending";
  certificationBody: string;
  diamondDetails: {
    caratWeight: number;
    color: string;
    clarity: string;
    cut: string;
    shape: string;
    measurements: string;
    polish: string;
    symmetry: string;
    fluorescence: string;
    girdle: string;
    culet: string;
    depth: number;
    table: number;
  };
  images: string[];
  qrCode: string;
  verificationUrl: string;
  issuedBy: string;
  approvedBy: string;
  notes?: string;
  downloadCount: number;
  lastDownloaded?: string;
}

interface SealingRecord {
  id: string;
  certificateId: string;
  sealNumber: string;
  sealDate: string;
  sealedBy: string;
  sealType: "tamper_evident" | "security" | "premium";
  status: "sealed" | "broken" | "expired";
  location: string;
  notes?: string;
}

const CustomerCertificatesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("certificates");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedCertificate, setSelectedCertificate] =
    useState<DiamondCertificate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Mock data
  const [certificates, setCertificates] = useState<DiamondCertificate[]>([
    {
      id: "CERT001",
      certificateNumber: "GIA-2394851726",
      requestId: "REQ001",
      customerId: "CUST001",
      diamondId: "DIA001",
      issueDate: "2025-01-15",
      expiryDate: "2027-01-15",
      status: "active",
      certificationBody: "GIA (Gemological Institute of America)",
      diamondDetails: {
        caratWeight: 1.52,
        color: "F",
        clarity: "VS1",
        cut: "Excellent",
        shape: "Round Brilliant",
        measurements: "7.45 × 7.48 × 4.62 mm",
        polish: "Excellent",
        symmetry: "Excellent",
        fluorescence: "None",
        girdle: "Medium to Slightly Thick",
        culet: "None",
        depth: 61.9,
        table: 57,
      },
      images: [
        "/certificates/cert001-main.jpg",
        "/certificates/cert001-detail.jpg",
      ],
      qrCode: "/qr/cert001.png",
      verificationUrl: "https://verify.diamond.com/GIA-2394851726",
      issuedBy: "Dr. Sarah Johnson",
      approvedBy: "Michael Chen, Director",
      downloadCount: 3,
      lastDownloaded: "2025-01-20",
    },
    {
      id: "CERT002",
      certificateNumber: "AGS-104087654321",
      requestId: "REQ002",
      customerId: "CUST001",
      diamondId: "DIA002",
      issueDate: "2024-12-10",
      expiryDate: "2026-12-10",
      status: "active",
      certificationBody: "AGS (American Gem Society)",
      diamondDetails: {
        caratWeight: 2.01,
        color: "D",
        clarity: "FL",
        cut: "Ideal",
        shape: "Princess",
        measurements: "7.12 × 7.08 × 5.15 mm",
        polish: "Ideal",
        symmetry: "Ideal",
        fluorescence: "None",
        girdle: "Medium",
        culet: "None",
        depth: 72.5,
        table: 68,
      },
      images: ["/certificates/cert002-main.jpg"],
      qrCode: "/qr/cert002.png",
      verificationUrl: "https://verify.diamond.com/AGS-104087654321",
      issuedBy: "Dr. Emily Rodriguez",
      approvedBy: "David Wilson, Director",
      notes: "Exceptional quality diamond with perfect clarity",
      downloadCount: 1,
      lastDownloaded: "2024-12-15",
    },
    {
      id: "CERT003",
      certificateNumber: "DAS-2025-001234",
      requestId: "REQ003",
      customerId: "CUST001",
      diamondId: "DIA003",
      issueDate: "2025-01-22",
      expiryDate: "2027-01-22",
      status: "pending",
      certificationBody: "Diamond Assessment Services",
      diamondDetails: {
        caratWeight: 0.75,
        color: "G",
        clarity: "VS2",
        cut: "Very Good",
        shape: "Oval",
        measurements: "6.95 × 4.85 × 3.12 mm",
        polish: "Very Good",
        symmetry: "Good",
        fluorescence: "Faint",
        girdle: "Medium",
        culet: "Small",
        depth: 64.2,
        table: 59,
      },
      images: [],
      qrCode: "",
      verificationUrl: "",
      issuedBy: "Processing",
      approvedBy: "Pending Approval",
      downloadCount: 0,
    },
  ]);

  const [sealingRecords, setSealingRecords] = useState<SealingRecord[]>([
    {
      id: "SEAL001",
      certificateId: "CERT001",
      sealNumber: "SEL-2025-001",
      sealDate: "2025-01-16",
      sealedBy: "John Smith",
      sealType: "premium",
      status: "sealed",
      location: "Vault A-123",
      notes: "Sealed with tamper-evident premium seal",
    },
    {
      id: "SEAL002",
      certificateId: "CERT002",
      sealNumber: "SEL-2024-456",
      sealDate: "2024-12-11",
      sealedBy: "Maria Garcia",
      sealType: "security",
      status: "sealed",
      location: "Vault B-456",
    },
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-700 border border-green-200",
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      expired: "bg-red-100 text-red-700 border border-red-200",
      revoked: "bg-gray-100 text-gray-700 border border-gray-200",
    };
    return colors[status] || colors.pending;
  };

  const getSealStatusColor = (status: string) => {
    const colors = {
      sealed: "bg-green-100 text-green-700 border border-green-200",
      broken: "bg-red-100 text-red-700 border border-red-200",
      expired: "bg-gray-100 text-gray-700 border border-gray-200",
    };
    return colors[status] || colors.sealed;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      active: CheckCircle,
      pending: Clock,
      expired: AlertTriangle,
      revoked: AlertTriangle,
    };
    return icons[status] || Clock;
  };

  const handleDownloadCertificate = (certificate: DiamondCertificate) => {
    if (certificate.status === "pending") {
      toast.error("Certificate is still being processed");
      return;
    }

    // Simulate download
    toast.success(`Downloading certificate ${certificate.certificateNumber}`);

    // Update download count
    setCertificates((prev) =>
      prev.map((cert) =>
        cert.id === certificate.id
          ? {
              ...cert,
              downloadCount: cert.downloadCount + 1,
              lastDownloaded: new Date().toISOString().split("T")[0],
            }
          : cert
      )
    );
  };

  const handleShareCertificate = (certificate: DiamondCertificate) => {
    if (certificate.status === "pending") {
      toast.error("Certificate is still being processed");
      return;
    }

    navigator.clipboard.writeText(certificate.verificationUrl);
    toast.success("Verification link copied to clipboard");
  };

  const handleVerifyCertificate = (certificate: DiamondCertificate) => {
    if (certificate.verificationUrl) {
      window.open(certificate.verificationUrl, "_blank");
    } else {
      toast.error("Verification not available for pending certificates");
    }
  };

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.diamondDetails.shape
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cert.certificationBody.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || cert.status === statusFilter;

    const now = new Date();
    const issueDate = new Date(cert.issueDate);
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "last_30" &&
        now.getTime() - issueDate.getTime() <= 30 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "last_90" &&
        now.getTime() - issueDate.getTime() <= 90 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "this_year" &&
        issueDate.getFullYear() === now.getFullYear());

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Certificates & Sealing
          </h1>
          <p className="text-slate-600 mt-2">
            View and manage your diamond certificates and sealing records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/70 hover:bg-white/90">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Request New
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {certificates.length}
            </div>
            <p className="text-xs text-slate-600">Lifetime certificates</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Active Certificates
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {certificates.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-slate-600">Valid certificates</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Sealed Items
            </CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {sealingRecords.length}
            </div>
            <p className="text-xs text-slate-600">Secured diamonds</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Value
            </CardTitle>
            <Gem className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {certificates
                .reduce((sum, cert) => sum + cert.diamondDetails.caratWeight, 0)
                .toFixed(2)}
              ct
            </div>
            <p className="text-xs text-slate-600">Total carat weight</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-md">
          <TabsTrigger
            value="certificates"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            Certificates
          </TabsTrigger>
          <TabsTrigger
            value="sealing"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Shield className="mr-2 h-4 w-4" />
            Sealing Records
          </TabsTrigger>
          <TabsTrigger
            value="verification"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Verification
          </TabsTrigger>
        </TabsList>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Filter className="h-5 w-5" />
                Filter Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Search certificates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/70"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2 w-full"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date Range</Label>
                  <select
                    id="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2 w-full"
                  >
                    <option value="all">All Time</option>
                    <option value="last_30">Last 30 Days</option>
                    <option value="last_90">Last 90 Days</option>
                    <option value="this_year">This Year</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCertificates.map((certificate) => {
              const StatusIcon = getStatusIcon(certificate.status);
              return (
                <Card
                  key={certificate.id}
                  className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {certificate.certificateNumber}
                          </h3>
                          <Badge className={getStatusColor(certificate.status)}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {certificate.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                          {certificate.certificationBody}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              certificate.issueDate
                            ).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Gem className="h-4 w-4" />
                            {certificate.diamondDetails.caratWeight}ct
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDownloadCertificate(certificate)
                            }
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleShareCertificate(certificate)}
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleVerifyCertificate(certificate)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Verify Online
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Diamond Details Summary */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-600">Shape & Cut</p>
                        <p className="font-semibold text-slate-800">
                          {certificate.diamondDetails.shape} -{" "}
                          {certificate.diamondDetails.cut}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">
                          Color & Clarity
                        </p>
                        <p className="font-semibold text-slate-800">
                          {certificate.diamondDetails.color} -{" "}
                          {certificate.diamondDetails.clarity}
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 bg-white rounded border">
                        <p className="text-xs text-slate-600">Carat</p>
                        <p className="font-bold text-blue-600">
                          {certificate.diamondDetails.caratWeight}
                        </p>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="text-xs text-slate-600">Color</p>
                        <p className="font-bold text-green-600">
                          {certificate.diamondDetails.color}
                        </p>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="text-xs text-slate-600">Clarity</p>
                        <p className="font-bold text-purple-600">
                          {certificate.diamondDetails.clarity}
                        </p>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="text-xs text-slate-600">Cut</p>
                        <p className="font-bold text-orange-600">
                          {certificate.diamondDetails.cut}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-slate-200/50">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedCertificate(certificate);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleDownloadCertificate(certificate)}
                        disabled={certificate.status === "pending"}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => handleVerifyCertificate(certificate)}
                        disabled={certificate.status === "pending"}
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Sealing Records Tab */}
        <TabsContent value="sealing" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Sealing Records
              </CardTitle>
              <CardDescription>
                Track the sealing status and security of your certified diamonds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead>Certificate</TableHead>
                    <TableHead>Seal Number</TableHead>
                    <TableHead>Seal Type</TableHead>
                    <TableHead>Sealed Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sealingRecords.map((record) => {
                    const certificate = certificates.find(
                      (c) => c.id === record.certificateId
                    );
                    return (
                      <TableRow
                        key={record.id}
                        className="hover:bg-slate-50/50"
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-800">
                              {certificate?.certificateNumber}
                            </p>
                            <p className="text-sm text-slate-600">
                              {certificate?.diamondDetails.caratWeight}ct{" "}
                              {certificate?.diamondDetails.shape}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-slate-800">
                            {record.sealNumber}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.sealType === "premium"
                                ? "bg-purple-100 text-purple-700 border border-purple-200"
                                : record.sealType === "security"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }
                          >
                            {record.sealType.replace("_", " ").toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-slate-800">
                            {new Date(record.sealDate).toLocaleDateString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSealStatusColor(record.status)}>
                            {record.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-800">
                              {record.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
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
                                <Download className="mr-2 h-4 w-4" />
                                Download Record
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Check Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Certificate Verification
              </CardTitle>
              <CardDescription>
                Verify the authenticity of diamond certificates using QR codes
                or certificate numbers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Quick Verify
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cert-number">Certificate Number</Label>
                      <Input
                        id="cert-number"
                        placeholder="Enter certificate number..."
                        className="bg-white/70"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <QrCode className="mr-2 h-4 w-4" />
                      Verify Certificate
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    QR Code Scanner
                  </h3>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <QrCode className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="mt-2">
                      <p className="text-slate-600">
                        Scan QR code from certificate
                      </p>
                      <Button variant="outline" className="mt-2">
                        <Camera className="mr-2 h-4 w-4" />
                        Open Scanner
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Your Verified Certificates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates
                    .filter((cert) => cert.status === "active")
                    .map((certificate) => (
                      <Card
                        key={certificate.id}
                        className="border border-slate-200 hover:shadow-md transition-all duration-200"
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-slate-800">
                              {certificate.certificateNumber}
                            </h4>
                            <Badge className="bg-green-100 text-green-700 border border-green-200">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 space-y-1">
                            <p>
                              {certificate.diamondDetails.caratWeight}ct{" "}
                              {certificate.diamondDetails.shape}
                            </p>
                            <p>
                              {certificate.diamondDetails.color} -{" "}
                              {certificate.diamondDetails.clarity}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() =>
                                handleVerifyCertificate(certificate)
                              }
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Verify Online
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleShareCertificate(certificate)
                              }
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Certificate Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-md max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Certificate Details
            </DialogTitle>
            <DialogDescription>
              Complete information for certificate{" "}
              {selectedCertificate?.certificateNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedCertificate && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Certificate Information
                    </h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">
                          Certificate Number:
                        </span>
                        <span className="font-medium">
                          {selectedCertificate.certificateNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">
                          Certification Body:
                        </span>
                        <span className="font-medium">
                          {selectedCertificate.certificationBody}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Issue Date:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedCertificate.issueDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Expiry Date:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedCertificate.expiryDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <Badge
                          className={getStatusColor(selectedCertificate.status)}
                        >
                          {selectedCertificate.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Issuance Details
                    </h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Issued By:</span>
                        <span className="font-medium">
                          {selectedCertificate.issuedBy}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Approved By:</span>
                        <span className="font-medium">
                          {selectedCertificate.approvedBy}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Downloads:</span>
                        <span className="font-medium">
                          {selectedCertificate.downloadCount} times
                        </span>
                      </div>
                      {selectedCertificate.lastDownloaded && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            Last Downloaded:
                          </span>
                          <span className="font-medium">
                            {new Date(
                              selectedCertificate.lastDownloaded
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Diamond Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Diamond Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">
                      Basic Properties
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Carat Weight:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.caratWeight}ct
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Shape:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.shape}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Measurements:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.measurements}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">
                      4Cs Grading
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Cut:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.cut}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Color:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.color}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Clarity:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.clarity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">
                      Additional Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Polish:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.polish}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Symmetry:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.symmetry}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Fluorescence:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.fluorescence}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">
                      Proportions
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Table:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.table}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Depth:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.depth}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Girdle:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.girdle}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Culet:</span>
                        <span className="font-medium">
                          {selectedCertificate.diamondDetails.culet}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedCertificate.notes && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-2">
                        Additional Notes
                      </h4>
                      <p className="text-sm text-slate-700">
                        {selectedCertificate.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* QR Code and Verification */}
              {selectedCertificate.qrCode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h4 className="font-medium text-slate-800 mb-2">QR Code</h4>
                    <div className="inline-block p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="w-32 h-32 bg-slate-100 rounded flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-slate-400" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Scan to verify authenticity
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Verification</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            Certificate Verified
                          </span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          This certificate is authentic and valid
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleVerifyCertificate(selectedCertificate)
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Verify Online
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            {selectedCertificate && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleShareCertificate(selectedCertificate)}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  onClick={() => handleDownloadCertificate(selectedCertificate)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerCertificatesPage;
