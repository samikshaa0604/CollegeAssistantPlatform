"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { Target, TrendingUp, BookOpen, ExternalLink, Filter, Star, Building2, Users } from "lucide-react"

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
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science Engineering")
  const [selectedSemester, setSelectedSemester] = useState("6")
  const [selectedCompany, setSelectedCompany] = useState("All Companies")

  const departments = [
    "Computer Science Engineering",
    "Electronics & Communication Engineering",
    "Information Technology",
    "Mechanical Engineering",
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Placement Roadmap Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Interactive insights and roadmaps for successful placements with company-wise requirements and practice
            resources.
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
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
                    {["5", "6", "7", "8"].map((sem) => (
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

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">94%</div>
                <p className="text-sm text-muted-foreground">Placement Rate</p>
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
                <Star className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">₹21.2L</div>
                <p className="text-sm text-muted-foreground">Avg Package</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-4/10 p-3">
                <Users className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">450+</div>
                <p className="text-sm text-muted-foreground">Students Placed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subjects">Subject Importance</TabsTrigger>
            <TabsTrigger value="companies">Company Analysis</TabsTrigger>
            <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
            <TabsTrigger value="trends">Placement Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Subject Importance Chart */}
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

              {/* Subject Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Details</CardTitle>
                  <CardDescription>Detailed breakdown of key subjects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjectDetails.slice(0, 3).map((subject) => (
                    <div key={subject.name} className="space-y-3 border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{subject.name}</h4>
                        <Badge variant="secondary">{subject.importance}% Important</Badge>
                      </div>
                      <Progress value={subject.importance} className="h-2" />
                      <div className="flex flex-wrap gap-1">
                        {subject.companies.slice(0, 4).map((company) => (
                          <Badge key={company} variant="outline" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                        {subject.companies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{subject.companies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                      <div
                        key={company.name}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
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
            </div>
          </TabsContent>

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
                      <Badge variant="secondary">{subject.importance}% Important</Badge>
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
                        {subject.topics.map((topic) => (
                          <div key={topic} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm text-foreground">{topic}</span>
                          </div>
                        ))}
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
                              <Button size="sm" variant="outline" asChild>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
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
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="placed"
                        stroke={chartConfig.placed.color}
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="package"
                        stroke={chartConfig.package.color}
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
