// Tipos para conteúdo e certificações
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: "ebook" | "article" | "podcast" | "video";
  thumbnail: string;
  url: string;
  duration?: string;
  author?: string;
}

export interface CertificationRequirement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

// Tipos para eventos e comunidade
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "webinar" | "workshop" | "lecture" | "meeting";
  speaker?: string;
  description: string;
  link?: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatarUrl: string;
  role?: string;
  joinDate: string;
}

export interface TopicItem {
  id: string;
  title: string;
  category: string;
  responseCount: number;
  lastActivity: string;
}

export interface PresentationItem {
  id: string;
  title: string;
  presenter: string;
  date: string;
  attendees: number;
}

// Tipos para credenciais
export type CredentialType = "professional" | "student";

export interface CredentialInfo {
  title: string;
  colorClass: string;
  prefix: string;
}

export interface QrCodeData {
  memberId: string;
  type: CredentialType;
  validUntil: string;
}

// Tipos para pagamento e assinatura
export type PaymentStatusType = "active" | "pending" | "suspended" | "cancelled";

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Pago" | "Pendente" | "Cancelado";
}

export interface PaymentStatusProps {
  status?: PaymentStatusType;
  plan?: string;
  nextBilling?: string;
  amount?: string;
  paymentMethod?: string;
  invoices?: Invoice[];
  paymentDate?: string;
  nextPaymentDate?: string;
  paymentId?: string;
  onUpdatePayment?: () => void;
  asaasConfirmed?: boolean;
  setAsaasConfirmed?: (confirmed: boolean) => void;
}

// Tipos para perfil e membro
export interface MembershipOverviewProps {
  memberSince: string;
  membershipStatus: "active" | "suspended" | "pending";
  nextPayment: string;
  certificationProgress: number;
  membershipType?: "standard" | "premium";
  paymentMethod?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  profession?: string;
  specialization?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

// Tipos para dashboard
export interface DashboardStats {
  totalCertifications: number;
  completedCourses: number;
  activeDiscussions: number;
  upcomingEvents: number;
}

export interface NotificationItem {
  id: string;
  type: "info" | "warning" | "success" | "error";
  message: string;
  date: string;
  read: boolean;
}

// Tipos para configurações
export interface UserPreferences {
  emailNotifications: boolean;
  newsletterSubscription: boolean;
  twoFactorEnabled: boolean;
  language: "pt-BR" | "en-US";
  theme: "light" | "dark" | "system";
}

// Tipos para documentos
export interface Document {
  id: string;
  title: string;
  type: "pdf" | "image" | "doc";
  url: string;
  uploadDate: string;
  size: number;
  status: "pending" | "approved" | "rejected";
}

// Tipos compartilhados
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}
