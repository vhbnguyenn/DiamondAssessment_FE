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
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Mail,
  CreditCard,
  Database,
  Bell,
  Key,
  Globe,
  Server,
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  Zap,
  Smartphone,
  Code,
  Palette,
  Monitor,
  Wifi,
  HardDrive,
  Calendar,
  Users,
  Building,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

interface SystemSettings {
  general: {
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    timezone: string;
    language: string;
    currency: string;
    logoUrl: string;
    faviconUrl: string;
  };
  security: {
    passwordMinLength: number;
    passwordRequireUppercase: boolean;
    passwordRequireNumbers: boolean;
    passwordRequireSymbols: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    twoFactorEnabled: boolean;
    ipWhitelist: string[];
    allowedDomains: string[];
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    smtpEncryption: string;
    fromEmail: string;
    fromName: string;
    replyToEmail: string;
    emailSignature: string;
  };
  payment: {
    vnpayEnabled: boolean;
    vnpayTmnCode: string;
    vnpaySecretKey: string;
    vnpayUrl: string;
    bankTransferEnabled: boolean;
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
    taxRate: number;
    currency: string;
  };
  assessment: {
    maxAssessmentsPerDay: number;
    standardProcessingTime: number;
    rushProcessingTime: number;
    qualityCheckRequired: boolean;
    autoAssignEnabled: boolean;
    certificateValidityDays: number;
    sampleRetentionDays: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    orderStatusUpdates: boolean;
    assessmentCompleted: boolean;
    paymentReceived: boolean;
    systemMaintenance: boolean;
    marketingEmails: boolean;
  };
  api: {
    apiEnabled: boolean;
    apiKey: string;
    webhookUrl: string;
    rateLimit: number;
    allowedOrigins: string[];
    apiVersion: string;
  };
  maintenance: {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    backupEnabled: boolean;
    backupFrequency: string;
    logRetentionDays: number;
    debugMode: boolean;
  };
}

const AdminSystemSettings: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      companyName: "Diamond Assessment Company",
      companyEmail: "info@diamond.com",
      companyPhone: "+84 123 456 789",
      companyAddress: "123 Diamond Street, Ho Chi Minh City, Vietnam",
      timezone: "Asia/Ho_Chi_Minh",
      language: "en",
      currency: "VND",
      logoUrl: "/logo.png",
      faviconUrl: "/favicon.ico",
    },
    security: {
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireNumbers: true,
      passwordRequireSymbols: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorEnabled: false,
      ipWhitelist: [],
      allowedDomains: ["diamond.com"],
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "noreply@diamond.com",
      smtpPassword: "••••••••",
      smtpEncryption: "tls",
      fromEmail: "noreply@diamond.com",
      fromName: "Diamond Assessment System",
      replyToEmail: "support@diamond.com",
      emailSignature: "Best regards,\nDiamond Assessment Team",
    },
    payment: {
      vnpayEnabled: true,
      vnpayTmnCode: "DIAMOND01",
      vnpaySecretKey: "••••••••••••••••",
      vnpayUrl: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
      bankTransferEnabled: true,
      bankName: "Vietcombank",
      bankAccount: "1234567890",
      bankAccountName: "Diamond Assessment Company",
      taxRate: 10,
      currency: "VND",
    },
    assessment: {
      maxAssessmentsPerDay: 50,
      standardProcessingTime: 48,
      rushProcessingTime: 24,
      qualityCheckRequired: true,
      autoAssignEnabled: true,
      certificateValidityDays: 365,
      sampleRetentionDays: 30,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      orderStatusUpdates: true,
      assessmentCompleted: true,
      paymentReceived: true,
      systemMaintenance: true,
      marketingEmails: false,
    },
    api: {
      apiEnabled: true,
      apiKey: "dk_live_51234567890abcdef",
      webhookUrl: "https://diamond.com/webhooks",
      rateLimit: 1000,
      allowedOrigins: ["https://diamond.com", "https://app.diamond.com"],
      apiVersion: "v1",
    },
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: "System is under maintenance. Please try again later.",
      backupEnabled: true,
      backupFrequency: "daily",
      logRetentionDays: 90,
      debugMode: false,
    },
  });

  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setHasUnsavedChanges(false);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Test email sent successfully!");
    } catch (error) {
      toast.error("Failed to send test email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success("Backup completed successfully!");
    } catch (error) {
      toast.error("Backup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const generateApiKey = () => {
    const newApiKey = `dk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    updateSettings('api', 'apiKey', newApiKey);
    toast.success("New API key generated!");
  };

  const SettingsSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const FormField = ({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <Label className="text-slate-700 font-medium">{label}</Label>
      {description && <p className="text-xs text-slate-500">{description}</p>}
      {children}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-slate-600 mt-2">
            Configure system-wide settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              Unsaved Changes
            </Badge>
          )}
          <Button 
            onClick={handleSave}
            disabled={isLoading || !hasUnsavedChanges}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Settings */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white/70 backdrop-blur-md">
          <TabsTrigger value="general" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Building className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="assessment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <FileText className="mr-2 h-4 w-4" />
            Assessment
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Code className="mr-2 h-4 w-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Server className="mr-2 h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Basic company details and branding settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="Company Details" description="Basic information about your company">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Company Name">
                    <Input
                      value={settings.general.companyName}
                      onChange={(e) => updateSettings('general', 'companyName', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Company Email">
                    <Input
                      type="email"
                      value={settings.general.companyEmail}
                      onChange={(e) => updateSettings('general', 'companyEmail', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Phone Number">
                    <Input
                      value={settings.general.companyPhone}
                      onChange={(e) => updateSettings('general', 'companyPhone', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Timezone">
                    <Select value={settings.general.timezone} onValueChange={(value) => updateSettings('general', 'timezone', value)}>
                      <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh (GMT+7)</SelectItem>
                        <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                        <SelectItem value="America/New_York">America/New York (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
                <FormField label="Company Address">
                  <Textarea
                    value={settings.general.companyAddress}
                    onChange={(e) => updateSettings('general', 'companyAddress', e.target.value)}
                    className="bg-white/70 border-slate-200 focus:border-blue-500"
                    rows={3}
                  />
                </FormField>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Localization" description="Language and currency preferences">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Default Language">
                    <Select value={settings.general.language} onValueChange={(value) => updateSettings('general', 'language', value)}>
                      <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Default Currency">
                    <Select value={settings.general.currency} onValueChange={(value) => updateSettings('general', 'currency', value)}>
                      <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VND">Vietnamese Dong (VND)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Branding" description="Logo and visual identity settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Logo URL" description="URL to your company logo">
                    <div className="flex gap-2">
                      <Input
                        value={settings.general.logoUrl}
                        onChange={(e) => updateSettings('general', 'logoUrl', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormField>
                  <FormField label="Favicon URL" description="URL to your website favicon">
                    <div className="flex gap-2">
                      <Input
                        value={settings.general.faviconUrl}
                        onChange={(e) => updateSettings('general', 'faviconUrl', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormField>
                </div>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Configure security policies and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="Password Policy" description="Requirements for user passwords">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Minimum Password Length">
                    <Input
                      type="number"
                      min="6"
                      max="32"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSettings('security', 'passwordMinLength', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Maximum Login Attempts">
                    <Input
                      type="number"
                      min="3"
                      max="10"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSettings('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Uppercase Letters</Label>
                      <p className="text-xs text-slate-500">Passwords must contain at least one uppercase letter</p>
                    </div>
                    <Switch
                      checked={settings.security.passwordRequireUppercase}
                      onCheckedChange={(checked) => updateSettings('security', 'passwordRequireUppercase', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Numbers</Label>
                      <p className="text-xs text-slate-500">Passwords must contain at least one number</p>
                    </div>
                    <Switch
                      checked={settings.security.passwordRequireNumbers}
                      onCheckedChange={(checked) => updateSettings('security', 'passwordRequireNumbers', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Special Characters</Label>
                      <p className="text-xs text-slate-500">Passwords must contain at least one symbol</p>
                    </div>
                    <Switch
                      checked={settings.security.passwordRequireSymbols}
                      onCheckedChange={(checked) => updateSettings('security', 'passwordRequireSymbols', checked)}
                    />
                  </div>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Session Management" description="Control user session behavior">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Session Timeout (minutes)" description="Automatic logout after inactivity">
                    <Input
                      type="number"
                      min="5"
                      max="480"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-xs text-slate-500">Require 2FA for all users</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(checked) => updateSettings('security', 'twoFactorEnabled', checked)}
                    />
                  </div>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Access Control" description="IP and domain restrictions">
                <FormField label="Allowed Domains" description="Comma-separated list of allowed email domains">
                  <Textarea
                    value={settings.security.allowedDomains.join(', ')}
                    onChange={(e) => updateSettings('security', 'allowedDomains', e.target.value.split(',').map(s => s.trim()))}
                    className="bg-white/70 border-slate-200 focus:border-blue-500"
                    rows={2}
                    placeholder="diamond.com, partner.com"
                  />
                </FormField>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure SMTP settings and email templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="SMTP Settings" description="Configure email server settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="SMTP Host">
                    <Input
                      value={settings.email.smtpHost}
                      onChange={(e) => updateSettings('email', 'smtpHost', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="SMTP Port">
                    <Input
                      type="number"
                      value={settings.email.smtpPort}
                      onChange={(e) => updateSettings('email', 'smtpPort', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="SMTP Username">
                    <Input
                      value={settings.email.smtpUsername}
                      onChange={(e) => updateSettings('email', 'smtpUsername', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="SMTP Password">
                    <div className="relative">
                      <Input
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) => updateSettings('email', 'smtpPassword', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500 pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormField>
                  <FormField label="Encryption">
                    <Select value={settings.email.smtpEncryption} onValueChange={(value) => updateSettings('email', 'smtpEncryption', value)}>
                      <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      onClick={handleTestEmail}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Test Connection
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Email Identity" description="Configure sender information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="From Email">
                    <Input
                      type="email"
                      value={settings.email.fromEmail}
                      onChange={(e) => updateSettings('email', 'fromEmail', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="From Name">
                    <Input
                      value={settings.email.fromName}
                      onChange={(e) => updateSettings('email', 'fromName', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Reply To Email">
                    <Input
                      type="email"
                      value={settings.email.replyToEmail}
                      onChange={(e) => updateSettings('email', 'replyToEmail', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                </div>
                <FormField label="Email Signature">
                  <Textarea
                    value={settings.email.emailSignature}
                    onChange={(e) => updateSettings('email', 'emailSignature', e.target.value)}
                    className="bg-white/70 border-slate-200 focus:border-blue-500"
                    rows={4}
                  />
                </FormField>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <CreditCard className="h-5 w-5" />
                Payment Configuration
              </CardTitle>
              <CardDescription>Configure payment gateways and financial settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="VNPay Integration" description="Configure VNPay payment gateway">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable VNPay Payments</Label>
                    <p className="text-xs text-slate-500">Allow customers to pay via VNPay</p>
                  </div>
                  <Switch
                    checked={settings.payment.vnpayEnabled}
                    onCheckedChange={(checked) => updateSettings('payment', 'vnpayEnabled', checked)}
                  />
                </div>
                
                {settings.payment.vnpayEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="TMN Code">
                      <Input
                        value={settings.payment.vnpayTmnCode}
                        onChange={(e) => updateSettings('payment', 'vnpayTmnCode', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                    </FormField>
                    <FormField label="Secret Key">
                      <Input
                        type="password"
                        value={settings.payment.vnpaySecretKey}
                        onChange={(e) => updateSettings('payment', 'vnpaySecretKey', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                    </FormField>
                    <FormField label="VNPay URL" description="Payment gateway URL">
                      <Input
                        value={settings.payment.vnpayUrl}
                        onChange={(e) => updateSettings('payment', 'vnpayUrl', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                    </FormField>
                  </div>
                )}
              </SettingsSection>

              <Separator />

              <SettingsSection title="Bank Transfer" description="Configure bank transfer payments">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable Bank Transfer</Label>
                    <p className="text-xs text-slate-500">Allow manual bank transfer payments</p>
                  </div>
                  <Switch
                    checked={settings.payment.bankTransferEnabled}
                    onCheckedChange={(checked) => updateSettings('payment', 'bankTransferEnabled', checked)}
                  />
                </div>
                
                {settings.payment.bankTransferEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Bank Name">
                      <Input
                        value={settings.payment.bankName}
                        onChange={(e) => updateSettings('payment', 'bankName', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                    </FormField>
                    <FormField label="Account Number">
                      <Input
                        value={settings.payment.bankAccount}
                        onChange={(e) => updateSettings('payment', 'bankAccount', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                    </FormField>
                    <FormField label="Account Name">
                      <Input
                        value={settings.payment.bankAccountName}
                        onChange={(e) => updateSettings('payment', 'bankAccountName', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                      />
                    </FormField>
                  </div>
                )}
              </SettingsSection>

              <Separator />

              <SettingsSection title="Financial Settings" description="Tax rates and currency settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Tax Rate (%)" description="Default tax rate for invoices">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={settings.payment.taxRate}
                      onChange={(e) => updateSettings('payment', 'taxRate', parseFloat(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Default Currency">
                    <Select value={settings.payment.currency} onValueChange={(value) => updateSettings('payment', 'currency', value)}>
                      <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VND">Vietnamese Dong (VND)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessment Settings Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <FileText className="h-5 w-5" />
                Assessment Configuration
              </CardTitle>
              <CardDescription>Configure diamond assessment workflow and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="Processing Limits" description="Control assessment workload and capacity">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Max Assessments Per Day" description="Maximum number of assessments to accept daily">
                    <Input
                      type="number"
                      min="1"
                      max="200"
                      value={settings.assessment.maxAssessmentsPerDay}
                      onChange={(e) => updateSettings('assessment', 'maxAssessmentsPerDay', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Standard Processing Time (hours)" description="Normal turnaround time">
                    <Input
                      type="number"
                      min="1"
                      max="168"
                      value={settings.assessment.standardProcessingTime}
                      onChange={(e) => updateSettings('assessment', 'standardProcessingTime', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Rush Processing Time (hours)" description="Express service turnaround time">
                    <Input
                      type="number"
                      min="1"
                      max="48"
                      value={settings.assessment.rushProcessingTime}
                      onChange={(e) => updateSettings('assessment', 'rushProcessingTime', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Quality Control" description="Configure quality assurance policies">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Quality Check Required</Label>
                      <p className="text-xs text-slate-500">Require secondary review for all assessments</p>
                    </div>
                    <Switch
                      checked={settings.assessment.qualityCheckRequired}
                      onCheckedChange={(checked) => updateSettings('assessment', 'qualityCheckRequired', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Assignment</Label>
                      <p className="text-xs text-slate-500">Automatically assign assessments to available staff</p>
                    </div>
                    <Switch
                      checked={settings.assessment.autoAssignEnabled}
                      onCheckedChange={(checked) => updateSettings('assessment', 'autoAssignEnabled', checked)}
                    />
                  </div>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Retention Policies" description="Configure data and sample retention">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Certificate Validity (days)" description="How long certificates remain valid">
                    <Input
                      type="number"
                      min="30"
                      max="3650"
                      value={settings.assessment.certificateValidityDays}
                      onChange={(e) => updateSettings('assessment', 'certificateValidityDays', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                  <FormField label="Sample Retention (days)" description="How long to keep physical samples">
                    <Input
                      type="number"
                      min="7"
                      max="365"
                      value={settings.assessment.sampleRetentionDays}
                      onChange={(e) => updateSettings('assessment', 'sampleRetentionDays', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                </div>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure notification channels and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="Notification Channels" description="Enable or disable notification methods">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-xs text-slate-500">Send notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSettings('notifications', 'emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-xs text-slate-500">Send notifications via SMS</p>
                    </div>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateSettings('notifications', 'smsNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-xs text-slate-500">Send browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSettings('notifications', 'pushNotifications', checked)}
                    />
                  </div>
                </div>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Event Notifications" description="Choose which events trigger notifications">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Status Updates</Label>
                      <p className="text-xs text-slate-500">Notify when order status changes</p>
                    </div>
                    <Switch
                      checked={settings.notifications.orderStatusUpdates}
                      onCheckedChange={(checked) => updateSettings('notifications', 'orderStatusUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Assessment Completed</Label>
                      <p className="text-xs text-slate-500">Notify when assessment is finished</p>
                    </div>
                    <Switch
                      checked={settings.notifications.assessmentCompleted}
                      onCheckedChange={(checked) => updateSettings('notifications', 'assessmentCompleted', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Received</Label>
                      <p className="text-xs text-slate-500">Notify when payment is confirmed</p>
                    </div>
                    <Switch
                      checked={settings.notifications.paymentReceived}
                      onCheckedChange={(checked) => updateSettings('notifications', 'paymentReceived', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Maintenance</Label>
                      <p className="text-xs text-slate-500">Notify about scheduled maintenance</p>
                    </div>
                    <Switch
                      checked={settings.notifications.systemMaintenance}
                      onCheckedChange={(checked) => updateSettings('notifications', 'systemMaintenance', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Emails</Label>
                      <p className="text-xs text-slate-500">Send promotional and marketing content</p>
                    </div>
                    <Switch
                      checked={settings.notifications.marketingEmails}
                      onCheckedChange={(checked) => updateSettings('notifications', 'marketingEmails', checked)}
                    />
                  </div>
                </div>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Code className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Configure API access and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="API Access" description="Control API availability and authentication">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable API Access</Label>
                    <p className="text-xs text-slate-500">Allow external applications to access the API</p>
                  </div>
                  <Switch
                    checked={settings.api.apiEnabled}
                    onCheckedChange={(checked) => updateSettings('api', 'apiEnabled', checked)}
                  />
                </div>

                {settings.api.apiEnabled && (
                  <div className="space-y-4">
                    <FormField label="API Key" description="Secret key for API authentication">
                      <div className="flex gap-2">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value={settings.api.apiKey}
                          readOnly
                          className="bg-gray-50 border-slate-200 font-mono"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={generateApiKey}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Rate Limit (requests/hour)" description="Maximum API requests per hour">
                        <Input
                          type="number"
                          min="100"
                          max="10000"
                          value={settings.api.rateLimit}
                          onChange={(e) => updateSettings('api', 'rateLimit', parseInt(e.target.value))}
                          className="bg-white/70 border-slate-200 focus:border-blue-500"
                        />
                      </FormField>
                      <FormField label="API Version">
                        <Select value={settings.api.apiVersion} onValueChange={(value) => updateSettings('api', 'apiVersion', value)}>
                          <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v1">Version 1.0</SelectItem>
                            <SelectItem value="v2">Version 2.0 (Beta)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                    </div>

                    <FormField label="Webhook URL" description="URL to receive webhook notifications">
                      <Input
                        value={settings.api.webhookUrl}
                        onChange={(e) => updateSettings('api', 'webhookUrl', e.target.value)}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                        placeholder="https://your-app.com/webhooks"
                      />
                    </FormField>

                    <FormField label="Allowed Origins" description="Comma-separated list of allowed CORS origins">
                      <Textarea
                        value={settings.api.allowedOrigins.join(', ')}
                        onChange={(e) => updateSettings('api', 'allowedOrigins', e.target.value.split(',').map(s => s.trim()))}
                        className="bg-white/70 border-slate-200 focus:border-blue-500"
                        rows={2}
                        placeholder="https://diamond.com, https://app.diamond.com"
                      />
                    </FormField>
                  </div>
                )}
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Server className="h-5 w-5" />
                System Maintenance
              </CardTitle>
              <CardDescription>Configure system maintenance and monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection title="Maintenance Mode" description="Control system availability">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable Maintenance Mode</Label>
                    <p className="text-xs text-slate-500">Put the system in maintenance mode</p>
                  </div>
                  <Switch
                    checked={settings.maintenance.maintenanceMode}
                    onCheckedChange={(checked) => updateSettings('maintenance', 'maintenanceMode', checked)}
                  />
                </div>

                {settings.maintenance.maintenanceMode && (
                  <FormField label="Maintenance Message" description="Message displayed to users during maintenance">
                    <Textarea
                      value={settings.maintenance.maintenanceMessage}
                      onChange={(e) => updateSettings('maintenance', 'maintenanceMessage', e.target.value)}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                      rows={3}
                    />
                  </FormField>
                )}
              </SettingsSection>

              <Separator />

              <SettingsSection title="Backup Configuration" description="Configure automatic backups">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable Automatic Backups</Label>
                    <p className="text-xs text-slate-500">Automatically backup system data</p>
                  </div>
                  <Switch
                    checked={settings.maintenance.backupEnabled}
                    onCheckedChange={(checked) => updateSettings('maintenance', 'backupEnabled', checked)}
                  />
                </div>

                {settings.maintenance.backupEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Backup Frequency">
                      <Select value={settings.maintenance.backupFrequency} onValueChange={(value) => updateSettings('maintenance', 'backupFrequency', value)}>
                        <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        onClick={handleBackup}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Creating Backup...
                          </>
                        ) : (
                          <>
                            <Database className="mr-2 h-4 w-4" />
                            Create Backup Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </SettingsSection>

              <Separator />

              <SettingsSection title="System Monitoring" description="Configure logging and debugging">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-xs text-slate-500">Enable detailed error logging</p>
                    </div>
                    <Switch
                      checked={settings.maintenance.debugMode}
                      onCheckedChange={(checked) => updateSettings('maintenance', 'debugMode', checked)}
                    />
                  </div>

                  <FormField label="Log Retention (days)" description="How long to keep system logs">
                    <Input
                      type="number"
                      min="7"
                      max="365"
                      value={settings.maintenance.logRetentionDays}
                      onChange={(e) => updateSettings('maintenance', 'logRetentionDays', parseInt(e.target.value))}
                      className="bg-white/70 border-slate-200 focus:border-blue-500"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Logs
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Logs
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white/95 backdrop-blur-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          Clear System Logs
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all system logs. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Clear Logs
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSystemSettings;