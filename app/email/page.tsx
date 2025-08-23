"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Send, Upload, Users, Clock, CheckCircle, Eye, FileText, Plus, Download } from "lucide-react"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  category: string
  lastUsed: string
}

interface EmailCampaign {
  id: string
  subject: string
  recipients: number
  sent: number
  opened: number
  status: "Draft" | "Sending" | "Sent" | "Failed"
  createdAt: string
}

export default function EmailAutomation() {
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState("all-students")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [sendingProgress, setSendingProgress] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Placement Drive Announcement",
      subject: "Upcoming Placement Drive - {Company Name}",
      body: "Dear Students,\n\nWe are excited to announce an upcoming placement drive with {Company Name}.\n\nDetails:\n- Date: {Date}\n- Time: {Time}\n- Venue: {Venue}\n- Eligibility: {Eligibility}\n\nPlease prepare accordingly and ensure you meet all requirements.\n\nBest regards,\nPlacement Cell",
      category: "Placement",
      lastUsed: "2024-01-15",
    },
    {
      id: "2",
      name: "Application Deadline Reminder",
      subject: "Reminder: Application Deadline - {Company Name}",
      body: "Dear Students,\n\nThis is a reminder that the application deadline for {Company Name} is approaching.\n\nDeadline: {Deadline}\nApplication Link: {Link}\n\nDon't miss this opportunity!\n\nBest regards,\nPlacement Cell",
      category: "Reminder",
      lastUsed: "2024-01-12",
    },
    {
      id: "3",
      name: "Interview Schedule",
      subject: "Interview Schedule - {Company Name}",
      body: "Dear {Student Name},\n\nCongratulations! You have been shortlisted for the interview with {Company Name}.\n\nInterview Details:\n- Date: {Date}\n- Time: {Time}\n- Mode: {Mode}\n- Instructions: {Instructions}\n\nBest of luck!\n\nBest regards,\nPlacement Cell",
      category: "Interview",
      lastUsed: "2024-01-10",
    },
  ]

  const recentCampaigns: EmailCampaign[] = [
    {
      id: "1",
      subject: "Google Placement Drive - Apply Now",
      recipients: 450,
      sent: 450,
      opened: 387,
      status: "Sent",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      subject: "Microsoft Interview Schedule",
      recipients: 25,
      sent: 25,
      opened: 23,
      status: "Sent",
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      subject: "Amazon Application Deadline Reminder",
      recipients: 320,
      sent: 280,
      opened: 0,
      status: "Sending",
      createdAt: "2024-01-13",
    },
  ]

  const recipientGroups = [
    { value: "all-students", label: "All Students", count: 2847 },
    { value: "cse-students", label: "CSE Students", count: 680 },
    { value: "ece-students", label: "ECE Students", count: 520 },
    { value: "it-students", label: "IT Students", count: 450 },
    { value: "final-year", label: "Final Year Students", count: 890 },
    { value: "pre-final", label: "Pre-Final Year Students", count: 850 },
    { value: "custom-list", label: "Upload Custom List", count: 0 },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type.includes("csv") || file.name.endsWith(".xlsx"))) {
      setUploadedFile(file)
    }
  }

  const handleSendEmail = async () => {
    if (!emailSubject || !emailBody) return

    setIsSending(true)
    setSendingProgress(0)

    // Simulate email sending progress
    const interval = setInterval(() => {
      setSendingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSending(false)
          alert("Emails sent successfully!")
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const loadTemplate = (template: EmailTemplate) => {
    setEmailSubject(template.subject)
    setEmailBody(template.body)
  }

  const getRecipientCount = () => {
    if (selectedRecipients === "custom-list" && uploadedFile) {
      return "Custom list uploaded"
    }
    const group = recipientGroups.find((g) => g.value === selectedRecipients)
    return group ? `${group.count} recipients` : "0 recipients"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-green-500"
      case "Sending":
        return "bg-yellow-500"
      case "Failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Email Automation System</h1>
          </div>
          <p className="text-muted-foreground">
            Send bulk emails efficiently to students with automated templates and recipient management.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">12,450</div>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-secondary/10 p-3">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">2,847</div>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-3/10 p-3">
                <Eye className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">89%</div>
                <p className="text-sm text-muted-foreground">Open Rate</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-4/10 p-3">
                <FileText className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">15</div>
                <p className="text-sm text-muted-foreground">Templates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compose">Compose Email</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Email Composer */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compose Email</CardTitle>
                    <CardDescription>Create and send bulk emails to students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter email subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipients">Recipients</Label>
                      <Select value={selectedRecipients} onValueChange={setSelectedRecipients}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {recipientGroups.map((group) => (
                            <SelectItem key={group.value} value={group.value}>
                              {group.label} {group.count > 0 && `(${group.count})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">{getRecipientCount()}</p>
                    </div>

                    {selectedRecipients === "custom-list" && (
                      <div className="space-y-2">
                        <Label htmlFor="file-upload">Upload Recipient List</Label>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileUpload}
                          className="file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:text-primary-foreground"
                        />
                        {uploadedFile && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {uploadedFile.name}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="body">Message</Label>
                      <Textarea
                        id="body"
                        placeholder="Enter your email message here..."
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        rows={12}
                      />
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Email Preview</DialogTitle>
                            <DialogDescription>Preview how your email will look to recipients</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="border-b border-border pb-4">
                              <p className="text-sm text-muted-foreground">Subject:</p>
                              <p className="font-medium">{emailSubject || "No subject"}</p>
                            </div>
                            <div className="whitespace-pre-wrap rounded-lg bg-muted p-4">
                              {emailBody || "No message content"}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        onClick={handleSendEmail}
                        disabled={!emailSubject || !emailBody || isSending}
                        className="flex items-center gap-2"
                      >
                        {isSending ? (
                          <>
                            <Clock className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Email
                          </>
                        )}
                      </Button>
                    </div>

                    {isSending && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Sending progress</span>
                          <span>{sendingProgress}%</span>
                        </div>
                        <Progress value={sendingProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Templates */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Templates</CardTitle>
                    <CardDescription>Use pre-built templates to save time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {emailTemplates.slice(0, 3).map((template) => (
                      <div
                        key={template.id}
                        className="cursor-pointer rounded-lg border border-border p-3 hover:bg-muted/50"
                        onClick={() => loadTemplate(template)}
                      >
                        <h4 className="font-medium text-foreground">{template.name}</h4>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Templates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Email Templates</h3>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Template
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {emailTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{template.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.body}</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => loadTemplate(template)}>
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last used: {new Date(template.lastUsed).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Email Campaigns</h3>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="p-4 text-left font-medium text-muted-foreground">Subject</th>
                        <th className="p-4 text-left font-medium text-muted-foreground">Recipients</th>
                        <th className="p-4 text-left font-medium text-muted-foreground">Sent</th>
                        <th className="p-4 text-left font-medium text-muted-foreground">Opened</th>
                        <th className="p-4 text-left font-medium text-muted-foreground">Status</th>
                        <th className="p-4 text-left font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCampaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b border-border/50">
                          <td className="p-4 font-medium text-foreground">{campaign.subject}</td>
                          <td className="p-4 text-muted-foreground">{campaign.recipients}</td>
                          <td className="p-4 text-muted-foreground">{campaign.sent}</td>
                          <td className="p-4 text-muted-foreground">
                            {campaign.opened} ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                          </td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(campaign.status)} text-white`}>{campaign.status}</Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(campaign.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recipient Groups</h3>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import Recipients
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipientGroups
                .filter((group) => group.value !== "custom-list")
                .map((group) => (
                  <Card key={group.value}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h4 className="font-medium text-foreground">{group.label}</h4>
                        <p className="text-sm text-muted-foreground">{group.count} students</p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
