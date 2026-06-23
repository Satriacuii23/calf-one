'use client';

import {
  User,
  Bell,
  Settings,
  Shield,
  Database,
  Sun,
  Moon,
} from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import { MainLayout } from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <MainLayout title="Settings" subtitle="Manage your preferences">
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2"><Sun className="h-4 w-4" /> Preferences</TabsTrigger>
            <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2"><Database className="h-4 w-4" /> Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Satria A" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="satria@kopicalf.id" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+62 812 3456 7890" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select defaultValue="founder">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="founder">Founder</SelectItem>
                          <SelectItem value="co-founder">Co-Founder</SelectItem>
                          <SelectItem value="ceo">CEO</SelectItem>
                          <SelectItem value="coo">COO</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                          <SelectItem value="manager">Area Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">Organization</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input defaultValue="Kopi Calf" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Subscription</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30">
                          Enterprise
                        </Badge>
                        <span className="text-sm text-muted-foreground">Unlimited outlets</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Team Members</p>
                        <p className="text-sm text-muted-foreground">15 active users</p>
                      </div>
                      <Button variant="outline" size="sm">Manage Team</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2"><Bell className="h-4 w-4" /> Alerts</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Critical Risks</p>
                          <p className="text-sm text-muted-foreground">Get notified for critical alerts</p>
                        </div>
                        <Switch.Root defaultChecked className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-blue-600">
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Revenue Milestones</p>
                          <p className="text-sm text-muted-foreground">Daily summaries</p>
                        </div>
                        <Switch.Root defaultChecked className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-blue-600">
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Outlet Performance</p>
                          <p className="text-sm text-muted-foreground">Alert when below target</p>
                        </div>
                        <Switch.Root defaultChecked className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-blue-600">
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2"><Bell className="h-4 w-4" /> Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Email Notifications</p>
                        <Switch.Root defaultChecked className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-blue-600">
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Push Notifications</p>
                        <Switch.Root defaultChecked className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-blue-600">
                          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
                        </Switch.Root>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex gap-2">
                        {['#1e3a5f', '#3b82f6', '#8b5cf6', '#ec4899', '#22c55e'].map((color) => (
                          <button
                            key={color}
                            className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                            style={{ backgroundColor: color, borderColor: color === '#1e3a5f' ? 'white' : 'transparent' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">Regional</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="id">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select defaultValue="idr">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idr">IDR - Indonesian Rupiah</SelectItem>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="asia-jakarta">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-jakarta">Asia/Jakarta (WIB)</SelectItem>
                          <SelectItem value="asia-makassar">Asia/Makassar (WITA)</SelectItem>
                          <SelectItem value="asia-jayapura">Asia/Jayapura (WIT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2"><Shield className="h-4 w-4" /> Password</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2"><Shield className="h-4 w-4" /> Two-Factor Auth</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">Add extra security</p>
                      </div>
                      <Switch.Root className="w-11 h-6 bg-muted rounded-full relative data-[state=checked]:bg-blue-600">
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5" />
                      </Switch.Root>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">Connected Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                          <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Supabase</p>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Settings className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">ESB POS</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-semibold mb-4">API Access</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Production API Key</p>
                        <Button variant="ghost" size="sm">Regenerate</Button>
                      </div>
                      <code className="text-xs text-muted-foreground font-mono">clf_prod_*******************************</code>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Development API Key</p>
                        <Button variant="ghost" size="sm">Regenerate</Button>
                      </div>
                      <code className="text-xs text-muted-foreground font-mono">clf_dev_*******************************</code>
                    </div>
                    <Button className="w-full">Generate New API Key</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
