import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Bell, 
  Shield, 
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    appointments: true,
    medications: true,
    healthAlerts: true,
    newsletters: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully!');
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? '2FA disabled' : '2FA enabled successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="firstName" placeholder="Dikshya" className="pl-10" defaultValue="Dikshya" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input id="lastName" placeholder="Tiwari" className="pl-10" defaultValue="Tiwari" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="email" type="email" placeholder="dikshya@example.com" className="pl-10" defaultValue="dikshya.tiwari@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="phone" placeholder="+91 98765 43210" className="pl-10" defaultValue="+91 98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input id="address" placeholder="City, State" className="pl-10" defaultValue="Mumbai, Maharashtra" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" placeholder="35" defaultValue="35" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input id="bloodGroup" placeholder="O+" defaultValue="O+" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" placeholder="175" defaultValue="175" />
                  </div>
                </div>

                <Button className="bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button className="bg-[#1E90FF] hover:bg-[#1873CC]" onClick={handleChangePassword}>
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-[#1E90FF]" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Enable 2FA</h4>
                      <p className="text-sm text-gray-600">Protect your account with two-factor authentication</p>
                    </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={handleEnable2FA} />
                </div>

                {twoFactorEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-[#00C851]/10 rounded-lg"
                  >
                    <p className="text-sm text-gray-700">
                      Two-factor authentication is enabled. You'll receive a verification code via SMS or email when signing in.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Current Device</h4>
                    <p className="text-sm text-gray-600">Chrome on Windows - Mumbai, India</p>
                    <p className="text-xs text-gray-500 mt-1">Active now</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    This Device
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile Device</h4>
                    <p className="text-sm text-gray-600">Safari on iPhone - Mumbai, India</p>
                    <p className="text-xs text-gray-500 mt-1">Last active 2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#FF6B6B] border-[#FF6B6B]">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-[#1E90FF]" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Appointment Reminders</h4>
                      <p className="text-sm text-gray-600">Get notified about upcoming appointments</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.appointments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, appointments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-[#00C851]" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Medication Reminders</h4>
                      <p className="text-sm text-gray-600">Receive alerts for your medicine schedule</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.medications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, medications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-[#FF6B6B]" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Health Alerts</h4>
                      <p className="text-sm text-gray-600">Important health insights and alerts</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.healthAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, healthAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#1E90FF]" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Newsletters & Updates</h4>
                      <p className="text-sm text-gray-600">Health tips and product updates</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.newsletters}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newsletters: checked })}
                  />
                </div>

                <Button className="bg-[#1E90FF] hover:bg-[#1873CC]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Manage your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-[#1E90FF]/10 to-[#00C851]/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-[#1E90FF] mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data Encryption</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        All your health records are encrypted with military-grade AES-256 encryption. Your data is secure and private.
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00C851] rounded-full"></div>
                        <span className="text-sm font-medium text-[#00C851]">Encryption Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Data Management</h4>
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Request Data Deletion
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-[#FF6B6B] border-[#FF6B6B]">
                    Delete Account
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Legal</h4>
                  <div className="space-y-2">
                    <a href="#" className="block text-sm text-[#1E90FF] hover:underline">Privacy Policy</a>
                    <a href="#" className="block text-sm text-[#1E90FF] hover:underline">Terms of Service</a>
                    <a href="#" className="block text-sm text-[#1E90FF] hover:underline">HIPAA Compliance</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}