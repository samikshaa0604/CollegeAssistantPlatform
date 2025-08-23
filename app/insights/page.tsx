"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, MessageSquare, Star, Building2, Plus, Search, ThumbsUp, Share2 } from "lucide-react"

interface Insight {
  id: string
  author: {
    name: string
    batch: string
    department: string
    currentRole: string
    company: string
    avatar?: string
  }
  company: string
  role: string
  package: string
  experience: string
  tips: string[]
  subjects: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  interviewRounds: number
  dateShared: string
  likes: number
  helpful: number
}

export default function SeniorInsights() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("All Companies")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

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
    "Goldman Sachs",
    "Morgan Stanley",
  ]

  const insights: Insight[] = [
    {
      id: "1",
      author: {
        name: "Priya Sharma",
        batch: "2023",
        department: "Computer Science Engineering",
        currentRole: "Software Engineer",
        company: "Google",
        avatar: "/professional-woman-diverse.png",
      },
      company: "Google",
      role: "Software Engineer",
      package: "₹65 LPA",
      experience:
        "The Google interview process was intense but fair. They focus heavily on data structures, algorithms, and system design. The interviewers were very supportive and gave hints when I was stuck. The key is to think out loud and explain your approach clearly.",
      tips: [
        "Practice coding problems daily on LeetCode",
        "Focus on explaining your thought process",
        "Prepare system design fundamentals",
        "Mock interviews are crucial",
      ],
      subjects: ["Data Structures", "Algorithms", "System Design"],
      difficulty: "Hard",
      interviewRounds: 5,
      dateShared: "2024-01-15",
      likes: 45,
      helpful: 38,
    },
    {
      id: "2",
      author: {
        name: "Rahul Kumar",
        batch: "2023",
        department: "Computer Science Engineering",
        currentRole: "SDE-1",
        company: "Amazon",
        avatar: "/professional-man.png",
      },
      company: "Amazon",
      role: "Software Development Engineer",
      package: "₹42 LPA",
      experience:
        "Amazon's interview process is very structured. They have 14 leadership principles that they evaluate you on. Every question has a behavioral component. Technical questions were medium level, focusing on practical problem-solving rather than complex algorithms.",
      tips: [
        "Study Amazon's leadership principles thoroughly",
        "Prepare STAR format stories",
        "Focus on practical coding problems",
        "Show customer obsession in your answers",
      ],
      subjects: ["Data Structures", "Algorithms", "Object Oriented Programming"],
      difficulty: "Medium",
      interviewRounds: 4,
      dateShared: "2024-01-10",
      likes: 32,
      helpful: 29,
    },
    {
      id: "3",
      author: {
        name: "Sneha Patel",
        batch: "2022",
        department: "Information Technology",
        currentRole: "Software Engineer",
        company: "Microsoft",
        avatar: "/professional-woman-tech.png",
      },
      company: "Microsoft",
      role: "Software Engineer",
      package: "₹58 LPA",
      experience:
        "Microsoft's interview was very collaborative. They care about how you work in teams and your problem-solving approach. The technical questions were fair, and they provided a very supportive environment. They also asked about my projects in detail.",
      tips: [
        "Prepare your projects thoroughly",
        "Practice pair programming",
        "Focus on clean, readable code",
        "Show enthusiasm for Microsoft's mission",
      ],
      subjects: ["Web Development", "Database Systems", "Software Engineering"],
      difficulty: "Medium",
      interviewRounds: 4,
      dateShared: "2024-01-08",
      likes: 28,
      helpful: 25,
    },
    {
      id: "4",
      author: {
        name: "Arjun Singh",
        batch: "2023",
        department: "Computer Science Engineering",
        currentRole: "Frontend Engineer",
        company: "Netflix",
        avatar: "/professional-man-developer.png",
      },
      company: "Netflix",
      role: "Frontend Engineer",
      package: "₹72 LPA",
      experience:
        "Netflix focuses heavily on frontend technologies and user experience. They asked me to build a small application during the interview. The culture fit interview was equally important as the technical rounds. They value creativity and innovation.",
      tips: [
        "Build impressive frontend projects",
        "Know React/Vue.js deeply",
        "Understand UX principles",
        "Prepare for live coding sessions",
      ],
      subjects: ["Web Development", "JavaScript", "User Interface Design"],
      difficulty: "Hard",
      interviewRounds: 3,
      dateShared: "2024-01-05",
      likes: 41,
      helpful: 35,
    },
  ]

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      insight.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCompany = selectedCompany === "All Companies" || insight.company === selectedCompany
    const matchesDifficulty = selectedDifficulty === "All Levels" || insight.difficulty === selectedDifficulty

    return matchesSearch && matchesCompany && matchesDifficulty
  })

  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  }

  const handleSubmitInsight = () => {
    // Mock submission
    setIsSubmitDialogOpen(false)
    alert("Thank you for sharing your insight! It will be reviewed and published soon.")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Senior Insights</h1>
            </div>
            <p className="text-muted-foreground">
              Learn from alumni experiences and get insider tips for successful placements.
            </p>
          </div>
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Share Your Placement Experience</DialogTitle>
                <DialogDescription>
                  Help junior students by sharing your placement journey and insights.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch Year</Label>
                    <Input id="batch" placeholder="e.g., 2023" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Job title" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Your Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Share your interview experience, what went well, challenges faced..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tips">Tips for Juniors</Label>
                  <Textarea id="tips" placeholder="Share your top tips for success..." rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitInsight}>Submit Insight</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">150+</div>
                <p className="text-sm text-muted-foreground">Alumni Contributors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-secondary/10 p-3">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">320+</div>
                <p className="text-sm text-muted-foreground">Shared Experiences</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-3/10 p-3">
                <Building2 className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">85+</div>
                <p className="text-sm text-muted-foreground">Companies Covered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-4/10 p-3">
                <Star className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4.8/5</div>
                <p className="text-sm text-muted-foreground">Helpfulness Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, company, role, or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="w-40">
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
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid gap-6">
          {filteredInsights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={insight.author.avatar || "/placeholder.svg"} alt={insight.author.name} />
                      <AvatarFallback>
                        {insight.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{insight.author.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          Batch {insight.author.batch}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.author.currentRole} at {insight.author.company}
                      </p>
                      <p className="text-xs text-muted-foreground">{insight.author.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge className={`${difficultyColors[insight.difficulty]} text-white`}>
                        {insight.difficulty}
                      </Badge>
                      <Badge variant="secondary">{insight.package}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {insight.interviewRounds} rounds • {new Date(insight.dateShared).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Experience</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.experience}</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Tips</h4>
                  <ul className="space-y-1">
                    {insight.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Important Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {insight.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      {insight.likes}
                    </Button>
                    <span className="text-sm text-muted-foreground">{insight.helpful} found this helpful</span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <Card className="flex h-64 items-center justify-center">
            <CardContent className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No insights found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search criteria or be the first to share an insight!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
