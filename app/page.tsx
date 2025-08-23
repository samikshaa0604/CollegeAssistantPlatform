"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  TrendingUp,
  Mail,
  Users,
  Clock,
  BookOpen,
  Target,
  Menu,
  X,
  GraduationCap,
  LogOut,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Code,
  Database,
  Smartphone,
  Github,
  Linkedin,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Sparkles,
  Rocket,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function CollegeAssistantPlatform() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock user data - in real app this would come from auth context
  const currentUser = {
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "Student",
    department: "Computer Science Engineering",
    avatar: "/placeholder.svg",
  }

  const navigationItems = [
    { name: "Dashboard", icon: TrendingUp, href: "/", active: true },
    { name: "Timetable Generator", icon: Calendar, href: "/timetable" },
    { name: "Placement Roadmap", icon: Target, href: "/placement" },
    { name: "Senior Insights", icon: Users, href: "/insights" },
    { name: "Bulk Mailing", icon: Mail, href: "/email" },
    { name: "Settings", icon: BookOpen, href: "/profile" },
  ]

  const stats = [
    {
      name: "Active Students",
      value: "2,847",
      icon: Users,
      change: "+12%",
      color: "text-primary",
      bgColor: "from-primary/20 to-primary/10",
      iconBg: "from-primary to-primary/80",
    },
    {
      name: "Timetables Generated",
      value: "156",
      icon: Calendar,
      change: "+8%",
      color: "text-secondary",
      bgColor: "from-secondary/20 to-secondary/10",
      iconBg: "from-secondary to-secondary/80",
    },
    {
      name: "Placement Success Rate",
      value: "87%",
      icon: Target,
      change: "+5%",
      color: "text-primary",
      bgColor: "from-primary/15 to-primary/5",
      iconBg: "from-primary to-primary/70",
    },
    {
      name: "Emails Sent",
      value: "12,450",
      icon: Mail,
      change: "+23%",
      color: "text-secondary",
      bgColor: "from-secondary/15 to-secondary/5",
      iconBg: "from-secondary to-secondary/70",
    },
  ]

  const features = [
    {
      title: "Automated Timetable Generator",
      description: "Generate conflict-free timetables automatically with AI-powered optimization",
      icon: Calendar,
      href: "/timetable",
      color: "bg-gradient-to-br from-primary to-primary/80",
      benefits: ["Zero teacher conflicts", "Optimized scheduling", "PDF/Excel export"],
      stats: "156 timetables generated",
      cardGradient: "from-primary/10 via-primary/5 to-primary/10",
    },
    {
      title: "Placement Roadmap & Insights",
      description: "Interactive dashboard with subject importance and company requirements",
      icon: Target,
      href: "/placement",
      color: "bg-gradient-to-br from-secondary to-secondary/80",
      benefits: ["Subject rankings", "Company analysis", "Practice resources"],
      stats: "87% placement success rate",
      cardGradient: "from-secondary/10 via-secondary/5 to-secondary/10",
    },
    {
      title: "Senior Insights Sharing",
      description: "Learn from alumni experiences and get insider placement tips",
      icon: Users,
      href: "/insights",
      color: "bg-gradient-to-br from-primary/80 to-secondary/80",
      benefits: ["Alumni stories", "Interview tips", "Real experiences"],
      stats: "500+ insights shared",
      cardGradient: "from-primary/8 via-secondary/8 to-primary/8",
    },
    {
      title: "Bulk Email Automation",
      description: "Streamlined communication system for placement cell and faculty",
      icon: Mail,
      href: "/email",
      color: "bg-gradient-to-br from-secondary/90 to-primary/90",
      benefits: ["Template management", "Bulk sending", "Analytics tracking"],
      stats: "12,450 emails sent",
      cardGradient: "from-secondary/8 via-primary/8 to-secondary/8",
    },
  ]

  const techStack = [
    { name: "Next.js", icon: Code, description: "React framework for production" },
    { name: "TypeScript", icon: Code, description: "Type-safe JavaScript" },
    { name: "Tailwind CSS", icon: Smartphone, description: "Utility-first CSS framework" },
    { name: "Shadcn/UI", icon: Smartphone, description: "Beautiful UI components" },
    { name: "Supabase", icon: Database, description: "Backend as a Service" },
    { name: "Vercel", icon: Globe, description: "Deployment platform" },
  ]

  const contributors = [
    {
      name: "Srilakshmi",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=60&width=60&text=S",
      gradient: "from-primary to-primary/80",
    },
    {
      name: "Meenakshi",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=60&width=60&text=M",
      gradient: "from-secondary to-secondary/80",
    },
    {
      name: "Anusha",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=60&width=60&text=A",
      gradient: "from-primary/80 to-secondary/80",
    },
    {
      name: "Rathod",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=60&width=60&text=R",
      gradient: "from-secondary/90 to-primary/90",
    },
  ]

  const handleLogout = () => {
    window.location.href = "/auth/login"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-rose-gradient flex items-center justify-center animate-pulse-slow shadow-lg shadow-purple-glow">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient-purple">College Assistant</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex bg-primary/20 text-primary border-primary/30 shadow-sm"
            >
              <Star className="h-3 w-3 mr-1" />
              {currentUser.role}
            </Badge>
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/30 hover:ring-primary/60 transition-all hover:scale-105">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback className="bg-purple-rose-gradient text-white">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-destructive/20 hover:text-destructive transition-all"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-full flex-col pt-16 lg:pt-0">
            {/* User Info in Sidebar */}
            <div className="border-b border-sidebar-border p-4 bg-purple-rose-gradient/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/30 shadow-lg">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback className="bg-purple-rose-gradient text-white">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{currentUser.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">{currentUser.department}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-purple-rose-gradient/20 hover:text-primary hover:scale-105 hover:shadow-md ${
                      item.active
                        ? "bg-purple-rose-gradient text-white shadow-lg animate-pulse-slow"
                        : "text-sidebar-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="space-y-8">
            <section className="relative overflow-hidden bg-purple-rose-gradient px-6 py-16">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              {/* Floating animated elements */}
              <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl animate-float shadow-purple-glow"></div>
              <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-xl animate-bounce-slow shadow-rose-glow"></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-xl animate-pulse-slow"></div>

              <div className="relative max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-primary/30 shadow-lg hover:shadow-xl transition-all">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-gradient-purple">Revolutionizing College Management</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white animate-pulse-slow drop-shadow-lg">
                  Welcome to College Assistant Platform
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  Streamline your academic journey with AI-powered timetable generation, placement insights, and
                  automated communication systems that make college life effortless!
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-8 py-4 text-lg"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 hover:bg-white/10 bg-white/10 backdrop-blur-sm text-white shadow-lg hover:shadow-xl transition-all px-8 py-4 text-lg"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </div>
            </section>

            <div className="px-6 space-y-12">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card
                    key={stat.name}
                    className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-2 hover:border-primary/30 shadow-purple-glow hover:shadow-rose-glow"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-80`}></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                      <CardTitle className="text-sm font-semibold text-card-foreground">{stat.name}</CardTitle>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.iconBg} shadow-lg`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">
                        <span className={`${stat.color} font-semibold text-base`}>{stat.change}</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <section className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-rose-gradient/10 border border-primary/20">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Powerful Features</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gradient-purple">Transform Your College Experience</h2>
                  <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                    Discover our comprehensive suite of tools designed to streamline college operations and enhance
                    student success with cutting-edge technology.
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  {features.map((feature, index) => (
                    <Link key={feature.title} href={feature.href}>
                      <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/40 shadow-purple-glow hover:shadow-rose-glow">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.cardGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        ></div>
                        <CardHeader className="relative">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-4 rounded-2xl ${feature.color} shadow-xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}
                            >
                              <feature.icon className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                                {feature.title}
                              </CardTitle>
                              <CardDescription className="text-sm mt-1">{feature.description}</CardDescription>
                            </div>
                            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
                          </div>
                        </CardHeader>
                        <CardContent className="relative space-y-4">
                          <ul className="space-y-3">
                            {feature.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-purple-rose-gradient animate-pulse"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-sm text-muted-foreground font-medium">{feature.stats}</span>
                            <Badge
                              variant="secondary"
                              className="bg-purple-rose-gradient/20 text-primary border-primary/30 shadow-sm"
                            >
                              Active
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-chart-2/10 border border-accent/20">
                    <Shield className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">About Our Platform</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gradient-purple">Built for Excellence</h2>
                  <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                    The College Assistant Platform is a comprehensive solution designed to automate and streamline key
                    college processes. Our mission is to reduce manual effort, save time, and provide students with
                    clear roadmaps for academic and placement success.
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        Key Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                      <div className="grid gap-4">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-chart-1/10 to-chart-1/5 hover:from-chart-1/20 hover:to-chart-1/10 transition-all">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-chart-1 to-chart-1/80 mt-1.5 animate-pulse"></div>
                          <div>
                            <h4 className="font-semibold text-chart-1">Automated Timetable Generation</h4>
                            <p className="text-sm text-muted-foreground">
                              AI-powered conflict resolution and optimization
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-chart-2/10 to-chart-2/5 hover:from-chart-2/20 hover:to-chart-2/10 transition-all">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-chart-2 to-chart-2/80 mt-1.5 animate-pulse"></div>
                          <div>
                            <h4 className="font-semibold text-chart-2">Placement Insights & Roadmaps</h4>
                            <p className="text-sm text-muted-foreground">
                              Data-driven career guidance and company analysis
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-chart-3/10 to-chart-3/5 hover:from-chart-3/20 hover:to-chart-3/10 transition-all">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-chart-3 to-chart-3/80 mt-1.5 animate-pulse"></div>
                          <div>
                            <h4 className="font-semibold text-chart-3">Senior Insights Sharing</h4>
                            <p className="text-sm text-muted-foreground">Alumni experiences and placement tips</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-chart-4/10 to-chart-4/5 hover:from-chart-4/20 hover:to-chart-4/10 transition-all">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-chart-4 to-chart-4/80 mt-1.5 animate-pulse"></div>
                          <div>
                            <h4 className="font-semibold text-chart-4">Bulk Email Automation</h4>
                            <p className="text-sm text-muted-foreground">
                              Streamlined communication for placement cells
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/30">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20">
                          <Code className="h-5 w-5 text-secondary" />
                        </div>
                        Tech Stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="grid gap-3">
                        {techStack.map((tech, index) => (
                          <div
                            key={tech.name}
                            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/80 to-muted/40 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 hover:shadow-md"
                          >
                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                              <tech.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{tech.name}</h4>
                              <p className="text-xs text-muted-foreground">{tech.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-rose-gradient/10 border border-secondary/20">
                    <Users className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium text-secondary">Our Amazing Team</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gradient-purple">Meet the Innovators</h2>
                  <p className="text-muted-foreground text-lg">
                    Meet the talented individuals who brought this platform to life with passion and dedication
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {contributors.map((contributor, index) => (
                    <Card
                      key={contributor.name}
                      className="text-center p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-2 hover:border-primary/30 shadow-purple-glow hover:shadow-rose-glow"
                    >
                      <div className="space-y-4">
                        <Avatar className="h-20 w-20 mx-auto ring-4 ring-primary/30 hover:ring-primary/60 transition-all shadow-xl">
                          <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                          <AvatarFallback
                            className={`bg-gradient-to-br ${contributor.gradient} text-white text-xl font-bold`}
                          >
                            {contributor.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-xl text-gradient-purple">{contributor.name}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{contributor.role}</p>
                        </div>
                        <div className="flex justify-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 p-0 hover:bg-primary/20 hover:text-primary transition-all"
                          >
                            <Github className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 p-0 hover:bg-secondary/20 hover:text-secondary transition-all"
                          >
                            <Linkedin className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-chart-2/10 border border-accent/20">
                    <MessageCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Get In Touch</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gradient-sage">💬 Let's Connect</h2>
                  <p className="text-muted-foreground text-lg">
                    Have questions or suggestions? We'd love to hear from you!
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
                    <div className="space-y-4">
                      <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 w-fit mx-auto">
                        <MapPin className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-primary">📍 Address</h3>
                        <p className="text-sm text-muted-foreground">
                          College Campus
                          <br />
                          Academic Block, Room 101
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent/30">
                    <div className="space-y-4">
                      <div className="p-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 w-fit mx-auto">
                        <Phone className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-accent">📞 Phone</h3>
                        <p className="text-sm text-muted-foreground">
                          +91 12345 67890
                          <br />
                          Mon-Fri 9AM-5PM
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-chart-2/30">
                    <div className="space-y-4">
                      <div className="p-4 rounded-full bg-gradient-to-br from-chart-2/20 to-chart-2/10 w-fit mx-auto">
                        <MessageCircle className="h-8 w-8 text-chart-2" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-chart-2">✉️ Email</h3>
                        <p className="text-sm text-muted-foreground">
                          support@collegeassistant.edu
                          <br />
                          We'll respond within 24hrs
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>

              <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    🔥 Recent Activities
                  </CardTitle>
                  <CardDescription>Latest updates and activities across the platform</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        action: "Timetable generated for CSE Semester 6",
                        time: "2 hours ago",
                        type: "timetable",
                        icon: Calendar,
                        color: "from-primary/20 to-primary/10",
                      },
                      {
                        action: "New placement insight shared by Alumni",
                        time: "4 hours ago",
                        type: "insight",
                        icon: Users,
                        color: "from-accent/20 to-accent/10",
                      },
                      {
                        action: "Bulk email sent to 450 students",
                        time: "6 hours ago",
                        type: "email",
                        icon: Mail,
                        color: "from-chart-3/20 to-chart-3/10",
                      },
                      {
                        action: "Placement roadmap updated for ECE",
                        time: "1 day ago",
                        type: "roadmap",
                        icon: Target,
                        color: "from-chart-2/20 to-chart-2/10",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${activity.color} hover:shadow-md transition-all duration-300 hover:scale-105`}
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg">
                          <activity.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-card-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs bg-white/80 border-primary/20">
                          ✨ {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
