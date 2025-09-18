"use client"

import { useMemo, useState ,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { Target, TrendingUp, BookOpen, ExternalLink, Filter, Star, Building2, Users, Bell, Download, GraduationCap, Calendar, ChevronRight, Crown } from "lucide-react"

interface Subject {
  name: string
  importance: number
  companies: string[]
  topics: string[]
  practiceLinks: { platform: string; url: string; count: number }[]
  prerequisites: string[]
}

interface Company {
  name: string
  subjects: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  packages: string
  hiringCount: number
}

export default function PlacementRoadmap() {
  const [selectedDepartment, setSelectedDepartment] = useState("CSE")
const [selectedSemester, setSelectedSemester] = useState("VI")
  const [selectedCompany, setSelectedCompany] = useState("All Companies")

  const [syllabus, setSyllabus] = useState<{ title: string; url: string }[]>([])
  const [loadingSyllabus, setLoadingSyllabus] = useState(false)

  // NEW: lightweight auth-less profile state (client-only)
  const [username] = useState("Student")

  // NEW: saved resources (bookmarks)
  const [savedResources, setSavedResources] = useState<{ platform: string; url: string; subject: string }[]>([])

  // NEW: topic completion by subject -> Set of topic names
  const [completedTopics, setCompletedTopics] = useState<Record<string, Set<string>>>({})

  // NEW: notifications panel toggle
  const [showNotifications, setShowNotifications] = useState(false)
  
  const departments = [
    "Civil Engineering",
    "Mechanical/Production Engineering",
    "Electrical & Electronics Engineering",
    "Electronics & Communications Engineering",
    "CSE",
    "CSE(AIML) & AIML",
    "CSE (IOT & CSBCT)",
    "Information Technology",
    "AI&DS",
    "Chemical Engineering",
    "Bio Technology",
    "MCA",
    "CBIT-School of Management Studies",
  ]

  const companies = [
    "All Companies",
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Adobe",
    "Salesforce",
  ]

  const subjectImportanceData = [
    { subject: "Data Structures", importance: 95, companies: 8 },
    { subject: "Algorithms", importance: 92, companies: 8 },
    { subject: "System Design", importance: 88, companies: 7 },
    { subject: "Database Systems", importance: 75, companies: 6 },
    { subject: "Computer Networks", importance: 70, companies: 5 },
    { subject: "Operating Systems", importance: 68, companies: 5 },
    { subject: "Object Oriented Programming", importance: 65, companies: 4 },
    { subject: "Web Development", importance: 60, companies: 4 },
  ]

  const companyData: Company[] = [
    {
      name: "Google",
      subjects: ["Data Structures", "Algorithms", "System Design"],
      difficulty: "Hard",
      packages: "₹50-80 LPA",
      hiringCount: 25,
    },
    {
      name: "Microsoft",
      subjects: ["Data Structures", "Algorithms", "System Design"],
      difficulty: "Hard",
      packages: "₹45-70 LPA",
      hiringCount: 30,
    },
    {
      name: "Amazon",
      subjects: ["Data Structures", "Algorithms", "System Design"],
      difficulty: "Medium",
      packages: "₹35-55 LPA",
      hiringCount: 40,
    },
    {
      name: "Meta",
      subjects: ["Data Structures", "Algorithms", "System Design"],
      difficulty: "Hard",
      packages: "₹55-85 LPA",
      hiringCount: 20,
    },
    {
      name: "Adobe",
      subjects: ["Data Structures", "Algorithms", "Web Development"],
      difficulty: "Medium",
      packages: "₹25-45 LPA",
      hiringCount: 15,
    },
  ]

  const placementTrendData = [
    { year: "2020", placed: 78, package: 12.5 },
    { year: "2021", placed: 82, package: 14.2 },
    { year: "2022", placed: 87, package: 16.8 },
    { year: "2023", placed: 91, package: 18.5 },
    { year: "2024", placed: 94, package: 21.2 },
  ]

  const subjectDetails: Subject[] = [
    {
      name: "Data Structures",
      importance: 95,
      companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Adobe", "Salesforce"],
      topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Hash Tables", "Heaps"],
      practiceLinks: [
        { platform: "LeetCode", url: "https://leetcode.com/tag/data-structure/", count: 450 },
        { platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/", count: 320 },
        { platform: "HackerRank", url: "https://www.hackerrank.com/domains/data-structures", count: 180 },
      ],
      prerequisites: ["Programming Fundamentals", "Mathematics"],
    },
    {
      name: "Algorithms",
      importance: 92,
      companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Adobe"],
      topics: ["Sorting", "Searching", "Dynamic Programming", "Greedy", "Divide & Conquer", "Graph Algorithms"],
      practiceLinks: [
        { platform: "LeetCode", url: "https://leetcode.com/tag/algorithms/", count: 520 },
        { platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/", count: 380 },
        { platform: "Codeforces", url: "https://codeforces.com/", count: 200 },
      ],
      prerequisites: ["Data Structures", "Mathematics", "Programming Fundamentals"],
    },
    {
      name: "System Design",
      importance: 88,
      companies: ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe", "Salesforce"],
      topics: ["Scalability", "Load Balancing", "Databases", "Caching", "Microservices", "API Design"],
      practiceLinks: [
        { platform: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", count: 50 },
        { platform: "High Scalability", url: "http://highscalability.com/", count: 100 },
        { platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/system-design-tutorial/", count: 80 },
      ],
      prerequisites: ["Database Systems", "Computer Networks", "Operating Systems"],
    },
  ]

  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  }

  const chartConfig = {
    importance: {
      label: "Importance Score",
      color: "#C8AAAA",
    },
    companies: {
      label: "Companies",
      color: "#574964",
    },
    placed: {
      label: "Placement Rate (%)",
      color: "#C8AAAA",
    },
    package: {
      label: "Average Package (LPA)",
      color: "#574964",
    },
  }

  // ---------- NEW: Events & Deadlines ----------
  const upcomingEvents = [
    { title: "Google Internship Applications Open", date: "2025-09-05", link: "https://careers.google.com/", type: "Applications" },
    { title: "LeetCode Weekly Contest #420", date: "2025-08-31", link: "https://leetcode.com/contest/", type: "Contest" },
    { title: "Hackathon: Smart India 2025 Reg Close", date: "2025-09-20", link: "https://www.sih.gov.in/", type: "Hackathon" },
    { title: "Campus Career Fair", date: "2025-10-10", link: "#", type: "Career" },
  ]

  const daysLeft = (iso: string) => {
    const now = new Date()
    const due = new Date(iso)
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }
    useEffect(() => {
    if (!selectedSemester || !selectedDepartment) return
    const fetchSyllabus = async () => {
      setLoadingSyllabus(true)
      try {
        const res = await fetch(`/api/syllabus?branch=${encodeURIComponent(selectedDepartment)}&sem=${selectedSemester}`)
        const data = await res.json()
        setSyllabus(data.syllabus || [])
      } catch (err) {
        console.error("Failed to fetch syllabus", err)
        setSyllabus([])
      } finally {
        setLoadingSyllabus(false)
      }
    }
    fetchSyllabus()
  }, [selectedDepartment, selectedSemester])

  // ---------- NEW: Derived Progress & Score ----------
  const subjectProgress = useMemo(() => {
    const out: Record<string, number> = {}
    subjectDetails.forEach((s) => {
      const done = completedTopics[s.name]?.size ?? 0
      const total = s.topics.length
      out[s.name] = total === 0 ? 0 : Math.round((done / total) * 100)
    })
    return out
  }, [completedTopics, subjectDetails])

  const overallProgress = useMemo(() => {
    const vals = Object.values(subjectProgress)
    if (!vals.length) return 0
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
  }, [subjectProgress])

  const resumeScore = useMemo(() => {
    // Simple heuristic: progress weight + bookmarks + targeted company rigor
    const base = overallProgress
    const bonus = Math.min(savedResources.length * 2, 20) // up to +20
    const rigor = selectedCompany === "All Companies" ? 0 : (companyData.find(c => c.name === selectedCompany)?.difficulty === "Hard" ? 10 : 5)
    return Math.min(base + bonus + rigor, 100)
  }, [overallProgress, savedResources.length, selectedCompany])

  // ---------- NEW: Notifications (derived) ----------
  const notifications = useMemo(() => {
    const near = upcomingEvents.filter(e => daysLeft(e.date) <= 7 && daysLeft(e.date) >= 0)
    const prog = overallProgress < 50 ? [{ title: "Your roadmap is below 50% complete", type: "Progress" }] : []
    const companyNudge = selectedCompany !== "All Companies" ? [{ title: `${selectedCompany} prep: Focus on ${companyData.find(c=>c.name===selectedCompany)?.subjects.join(", ")}` , type: "Company"}] : []
    return [
      ...near.map(n => ({ title: `${n.title} in ${daysLeft(n.date)} days`, type: n.type })),
      ...prog,
      ...companyNudge,
    ]
  }, [upcomingEvents, overallProgress, selectedCompany])

  // ---------- NEW: helpers ----------
  const toggleTopic = (subject: string, topic: string) => {
    setCompletedTopics((prev) => {
      const copy = { ...prev }
      const set = new Set(copy[subject] ?? [])
      if (set.has(topic)) set.delete(topic)
      else set.add(topic)
      copy[subject] = set
      return copy
    })
  }

  const isSaved = (url: string) => savedResources.some((r) => r.url === url)

  const toggleSave = (platform: string, url: string, subject: string) => {
    setSavedResources((prev) => {
      if (prev.some((r) => r.url === url)) return prev.filter((r) => r.url !== url)
      return [...prev, { platform, url, subject }]
    })
  }

  // ---------- NEW: Export ----------
  const exportJSON = () => {
    const payload = {
      username,
      selectedDepartment,
      selectedSemester,
      selectedCompany,
      progress: subjectProgress,
      savedResources,
      generatedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `roadmap-${selectedDepartment.replace(/\s+/g, "_")}-sem${selectedSemester}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = () => {
    const rows = [["Subject", "Progress(%)"], ...Object.entries(subjectProgress)]
    const csv = rows.map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `progress-${selectedDepartment.replace(/\s+/g, "_")}-sem${selectedSemester}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Top strip - simple & clean like LeetCode */}
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Placement Roadmap</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowNotifications((s) => !s)}>
              <Bell className="h-4 w-4 mr-2" /> Notifications ({notifications.length})
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-4 w-4 mr-2" /> CSV
            </Button>
            <Button size="sm" onClick={exportJSON}>
              <Download className="h-4 w-4 mr-2" /> Export Roadmap
            </Button>
          </div>
        </div>

        {/* Simple summary like LC header */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{overallProgress}%</div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-secondary/10 p-3">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">150+</div>
                <p className="text-sm text-muted-foreground">Partner Companies</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-3/10 p-3">
                <Crown className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{resumeScore}</div>
                <p className="text-sm text-muted-foreground">Resume Score (ATS)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-4/10 p-3">
                <Users className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">Welcome, {username}</div>
                <p className="text-sm text-muted-foreground">Dept: {selectedDepartment.split(" ")[0]} | Sem {selectedSemester}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["V", "VI", "VII", "VIII"].map((sem) => (
                      <SelectItem key={sem} value={sem}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Company</label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications panel */}
        {showNotifications && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5"/> Notifications</CardTitle>
              <CardDescription>Smart nudges based on your deadlines and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.length === 0 && (
                  <div className="text-sm text-muted-foreground">You are all caught up 🎉</div>
                )}
                {notifications.map((n, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{n.type}</Badge>
                      <span className="text-sm text-foreground">{n.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="subjects">Subject Importance</TabsTrigger>
            <TabsTrigger value="companies">Company Analysis</TabsTrigger>
            <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
            <TabsTrigger value="trends">Placement Trends</TabsTrigger>
            <TabsTrigger value="events">Events & Tracker</TabsTrigger>
            <TabsTrigger value="syllabus">Semester Syllabus</TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Syllabus - {selectedDepartment} (Sem {selectedSemester})
        </CardTitle>
        <CardDescription>Fetched live from CBIT site</CardDescription>
      </CardHeader>
      <CardContent>
        {loadingSyllabus && <p>Loading syllabus...</p>}
        {!loadingSyllabus && syllabus.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No syllabus found for {selectedDepartment}, Semester {selectedSemester}.
          </p>
        )}
        {!loadingSyllabus && syllabus.length > 0 && (
          <ul className="space-y-3">
            {syllabus.map((s, i) => (
              <li key={i} className="flex items-center justify-between border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">PDF</Badge>
                  <span className="font-medium">{s.title}</span>
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" /> Open
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  </TabsContent>

          {/* SUBJECTS */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Importance Rankings</CardTitle>
                  <CardDescription>Based on frequency in placement interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectImportanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="importance" fill={chartConfig.importance.color} radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Subject Details with progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Subject Progress</CardTitle>
                  <CardDescription>Mark topics done to update progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjectDetails.slice(0, 3).map((subject) => (
                    <div key={subject.name} className="space-y-3 border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{subject.name}</h4>
                        <Badge variant="secondary">{subjectProgress[subject.name] ?? 0}%</Badge>
                      </div>
                      <Progress value={subjectProgress[subject.name] ?? 0} className="h-2" />
                      {/* topic checkboxes */}
                      <div className="grid md:grid-cols-2 gap-2">
                        {subject.topics.map((topic) => {
                          const checked = completedTopics[subject.name]?.has(topic) ?? false
                          return (
                            <label key={topic} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleTopic(subject.name, topic)}
                                className="h-4 w-4 rounded border"
                              />
                              <span className={checked ? "line-through text-muted-foreground" : "text-foreground"}>{topic}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* COMPANIES */}
          <TabsContent value="companies" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Recruiting Companies</CardTitle>
                  <CardDescription>Companies with highest hiring rates and package details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {companyData.map((company) => (
                      <div key={company.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-foreground">{company.name}</h4>
                            <Badge className={`${difficultyColors[company.difficulty]} text-white`}>
                              {company.difficulty}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {company.subjects.map((subject) => (
                              <Badge key={subject} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-medium text-foreground">{company.packages}</div>
                          <div className="text-sm text-muted-foreground">{company.hiringCount} hired</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mentorship & Alumni */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5"/> Mentorship & Alumni</CardTitle>
                  <CardDescription>Connect with mentors and learn from alumni journeys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[{name:"Ananya Singh", role:"SDE", company:"Google"},{name:"Rohit Verma", role:"SDE-II", company:"Microsoft"},{name:"Meera N.", role:"Systems Engineer", company:"Amazon"}].map((m) => (
                      <Card key={m.name} className="p-4">
                        <div className="font-medium text-foreground">{m.name}</div>
                        <div className="text-sm text-muted-foreground">{m.role} • {m.company}</div>
                        <div className="mt-3 flex gap-2">
                          <Badge variant="outline">Mock Interview</Badge>
                          <Badge variant="outline">Resume Review</Badge>
                        </div>
                        <Button className="mt-4 w-full" variant="outline">Request Mentorship</Button>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ROADMAP */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid gap-6">
              {subjectDetails.map((subject) => (
                <Card key={subject.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {subject.name}
                        </CardTitle>
                        <CardDescription>Essential for {subject.companies.length} top companies</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{subject.importance}% Important</Badge>
                        <Badge variant="outline">{subjectProgress[subject.name] ?? 0}% Done</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Prerequisites */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Prerequisites</h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.prerequisites.map((prereq) => (
                          <Badge key={prereq} variant="outline">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Topics */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Key Topics to Master</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {subject.topics.map((topic) => {
                          const checked = completedTopics[subject.name]?.has(topic) ?? false
                          return (
                            <label key={topic} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleTopic(subject.name, topic)}
                                className="h-4 w-4 rounded border"
                              />
                              <span className={checked ? "line-through text-muted-foreground" : "text-foreground"}>{topic}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Practice Resources */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Practice Resources</h4>
                      <div className="grid gap-3 md:grid-cols-3">
                        {subject.practiceLinks.map((link) => (
                          <Card key={link.platform} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-foreground">{link.platform}</h5>
                                <p className="text-sm text-muted-foreground">{link.count} problems</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" asChild>
                                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                                <Button size="icon" variant={isSaved(link.url) ? "default" : "outline"} onClick={() => toggleSave(link.platform, link.url, subject.name)}>
                                  <Star className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TRENDS */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Trends Over Years</CardTitle>
                <CardDescription>Historical data showing placement rates and average packages</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={placementTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line yAxisId="left" type="monotone" dataKey="placed" stroke={chartConfig.placed.color} strokeWidth={3} />
                      <Line yAxisId="right" type="monotone" dataKey="package" stroke={chartConfig.package.color} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EVENTS, DEADLINES, FAVORITES, HEALTH */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Upcoming Events */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Upcoming Events & Deadlines</CardTitle>
                  <CardDescription>Stay on top of contests, hackathons, and application windows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((e) => (
                      <div key={e.title} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{e.type}</Badge>
                          <div>
                            <div className="font-medium text-foreground">{e.title}</div>
                            <div className="text-xs text-muted-foreground">Due: {new Date(e.date).toDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`text-sm ${daysLeft(e.date) < 0 ? "text-muted-foreground" : daysLeft(e.date) <= 3 ? "text-red-600" : "text-foreground"}`}>
                            {daysLeft(e.date) < 0 ? "Closed" : `${daysLeft(e.date)} days left`}
                          </div>
                          <Button size="sm" asChild>
                            <a href={e.link} target="_blank" rel="noreferrer">Open</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Saved / Favorites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5"/> Saved Resources</CardTitle>
                  <CardDescription>Your bookmarks from practice sites</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedResources.length === 0 && (
                    <div className="text-sm text-muted-foreground">No saved resources yet. Click the <Star className="inline h-3 w-3"/> on any card to save.</div>
                  )}
                  <div className="space-y-2">
                    {savedResources.map((r) => (
                      <div key={r.url} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-foreground">{r.platform}</div>
                          <div className="text-xs text-muted-foreground">{r.subject}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => toggleSave(r.platform, r.url, r.subject)}>Remove</Button>
                          <Button size="sm" asChild>
                            <a href={r.url} target="_blank" rel="noreferrer">Open</a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health & Sustainability (kept from your original concept) */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Interview & Aptitude Plan</CardTitle>
                  <CardDescription>Practice like LeetCode: daily problems + weekly mocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    <li>Daily: 2 DSA problems (mix of easy/medium)</li>
                    <li>Weekly: 1 mock interview, 1 aptitude set</li>
                    <li>Tracker updates your progress score automatically</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Checklist</CardTitle>
                  <CardDescription>Simple, minimal, ATS-friendly</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    <li>Resume: measurable impact bullets</li>
                    <li>Projects: links, short demo video</li>
                    <li>Certificates & hackathons in one Notion page</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wellness & Consistency</CardTitle>
                  <CardDescription>Guardrails to avoid burnout</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    <li>3×50 min Pomodoro, 10-min breaks</li>
                    <li>1 buffer day every 2 weeks</li>
                    <li>Backup code & notes weekly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
