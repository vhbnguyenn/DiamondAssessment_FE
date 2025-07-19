export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Customer extends User {
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
}

export interface Employee extends User {
  employeeId: string;
  firstName: string;
  lastName: string;
  department: "assessment" | "consultation" | "management";
  position: string;
  hireDate: string;
}

export type UserRole =
  | "guest"
  | "customer"
  | "assessment_staff"
  | "consultant"
  | "manager"
  | "admin";

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  featuredImage?: string;
  tags: string[];
}

export interface DiamondAssessmentRequest {
  id: string;
  customerId: string;
  customer: Customer;
  sampleCode: string;
  requestDate: string;
  status: AssessmentStatus;
  notes?: string;
  assignedStaffId?: string;
  assignedStaff?: Employee;
  completionDate?: string;
  result?: AssessmentResult;
}

export type AssessmentStatus =
  | "submitted"
  | "received"
  | "in_progress"
  | "quality_check"
  | "completed"
  | "returned"
  | "cancelled";

export interface AssessmentResult {
  id: string;
  requestId: string;
  diamondParameters: DiamondParameters;
  certificateId?: string;
  assessedBy: string;
  assessedAt: string;
  qualityGrade: string;
  estimatedValue: number;
  notes?: string;
}

export interface DiamondParameters {
  carat: number;
  cut: "excellent" | "very_good" | "good" | "fair" | "poor";
  color: "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N";
  clarity:
    | "FL"
    | "IF"
    | "VVS1"
    | "VVS2"
    | "VS1"
    | "VS2"
    | "SI1"
    | "SI2"
    | "I1"
    | "I2"
    | "I3";
  shape:
    | "round"
    | "princess"
    | "cushion"
    | "emerald"
    | "oval"
    | "radiant"
    | "asscher"
    | "marquise"
    | "heart"
    | "pear";
  measurements: {
    length: number;
    width: number;
    depth: number;
  };
  polish: "excellent" | "very_good" | "good" | "fair" | "poor";
  symmetry: "excellent" | "very_good" | "good" | "fair" | "poor";
  fluorescence: "none" | "faint" | "medium" | "strong" | "very_strong";
}

export interface Certificate {
  id: string;
  resultId: string;
  certificateNumber: string;
  issueDate: string;
  status: "draft" | "issued" | "revoked";
  digitalSignature: string;
  qrCode: string;
  pdfUrl?: string;
}

export interface ConsultationRequest {
  id: string;
  customerId: string;
  customer: Customer;
  subject: string;
  message: string;
  requestDate: string;
  status: "pending" | "assigned" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedConsultantId?: string;
  assignedConsultant?: Employee;
  response?: string;
  resolvedAt?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customer: Customer;
  orderNumber: string;
  services: OrderService[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  completionDate?: string;
  notes?: string;
}

export interface OrderService {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | "draft"
  | "submitted"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";
export type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "refunded";

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: "assessment" | "consultation" | "certification" | "additional";
  isActive: boolean;
  estimatedDuration: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: "vnpay" | "bank_transfer" | "cash";
  status: PaymentStatus;
  transactionId?: string;
  vnpayData?: VNPayData;
  createdAt: string;
  completedAt?: string;
}

export interface VNPayData {
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_ResponseCode: string;
  vnp_TransactionNo?: string;
  vnp_PayDate?: string;
  vnp_SecureHashType: string;
  vnp_SecureHash: string;
}

export interface ChatConversation {
  id: string;
  customerId: string;
  consultantId?: string;
  subject: string;
  status: "active" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "customer" | "consultant";
  message: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

export interface Feedback {
  id: string;
  customerId: string;
  customer: Customer;
  orderId?: string;
  rating: number; // 1-5 stars
  comment: string;
  category:
    | "service_quality"
    | "staff_behavior"
    | "timeliness"
    | "overall_experience";
  submittedAt: string;
  response?: string;
  respondedAt?: string;
  respondedBy?: string;
}

export interface SealingRecord {
  id: string;
  sampleCode: string;
  customerId: string;
  sealDate: string;
  sealedBy: string;
  location: string;
  status: "sealed" | "unsealed" | "returned";
  notes?: string;
}

export interface CommitmentPaper {
  id: string;
  requestId: string;
  customerId: string;
  commitmentNumber: string;
  serviceDescription: string;
  estimatedCompletion: string;
  terms: string;
  createdBy: string;
  createdAt: string;
  customerAccepted: boolean;
  acceptedAt?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth?: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AssessmentFilter {
  status?: AssessmentStatus[];
  dateFrom?: string;
  dateTo?: string;
  assignedStaffId?: string;
  customerId?: string;
}

export interface BlogFilter {
  published?: boolean;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderFilter {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
}
