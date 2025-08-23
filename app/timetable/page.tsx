"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Upload, Download, CheckCircle, AlertCircle, Clock, Users, BookOpen } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TimeSlot {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
}

interface GeneratedTimetable {
  department: string
  semester: string
  schedule: TimeSlot[]
  conflicts: number
  totalHours: number
}

export default function TimetableGenerator() {
  const [department, setDepartment] = useState("")
  const [semester, setSemester] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTimetable, setGeneratedTimetable] = useState<GeneratedTimetable | null>(null)

  const departments = [
    "Computer Science Engineering",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Information Technology",
  ]

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type.includes("csv") || file.type.includes("excel") || file.name.endsWith(".xlsx"))) {
      setUploadedFile(file)
    }
  }

  const generateTimetable = async () => {
    if (!department || !semester || !uploadedFile) return

    setIsGenerating(true)

    // Simulate timetable generation with optimization
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock generated timetable data
    const mockTimetable: GeneratedTimetable = {
      department,
      semester,
      conflicts: 0,
      totalHours: 30,
      schedule: [
        {
          time: "9:00 - 10:00",
          monday: "Data Structures\n(Dr. Smith)",
          tuesday: "Database Systems\n(Prof. Johnson)",
          wednesday: "Computer Networks\n(Dr. Brown)",
          thursday: "Software Engineering\n(Prof. Davis)",
          friday: "Web Development\n(Dr. Wilson)",
          saturday: "Lab Session\n(Multiple Faculty)",
        },
        {
          time: "10:00 - 11:00",
          monday: "Algorithms\n(Prof. Johnson)",
          tuesday: "Operating Systems\n(Dr. Smith)",
          wednesday: "Machine Learning\n(Prof. Taylor)",
          thursday: "Database Systems\n(Prof. Johnson)",
          friday: "Computer Graphics\n(Dr. Anderson)",
          saturday: "Project Work\n(Guide Faculty)",
        },
        {
          time: "11:00 - 12:00",
          monday: "Mathematics\n(Prof. Lee)",
          tuesday: "Data Structures\n(Dr. Smith)",
          wednesday: "Software Testing\n(Prof. Davis)",
          thursday: "Algorithms\n(Prof. Johnson)",
          friday: "Artificial Intelligence\n(Dr. Wilson)",
          saturday: "Seminar\n(Various Faculty)",
        },
        {
          time: "12:00 - 1:00",
          monday: "Break",
          tuesday: "Break",
          wednesday: "Break",
          thursday: "Break",
          friday: "Break",
          saturday: "Break",
        },
        {
          time: "1:00 - 2:00",
          monday: "Computer Networks\n(Dr. Brown)",
          tuesday: "Web Development\n(Dr. Wilson)",
          wednesday: "Database Lab\n(Prof. Johnson)",
          thursday: "Programming Lab\n(Dr. Smith)",
          friday: "Project Lab\n(Multiple Faculty)",
          saturday: "Free Period",
        },
        {
          time: "2:00 - 3:00",
          monday: "Software Engineering\n(Prof. Davis)",
          tuesday: "Machine Learning\n(Prof. Taylor)",
          wednesday: "Networks Lab\n(Dr. Brown)",
          thursday: "Software Lab\n(Prof. Davis)",
          friday: "Research Work\n(Guide Faculty)",
          saturday: "Free Period",
        },
      ],
    }

    setGeneratedTimetable(mockTimetable)
    setIsGenerating(false)
  }

  const exportTimetable = (format: "pdf" | "excel") => {
    // Mock export functionality
    const fileName = `${department}_Sem${semester}_Timetable.${format === "pdf" ? "pdf" : "xlsx"}`
    alert(`Exporting timetable as ${fileName}`)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Automated Timetable Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Generate conflict-free timetables with optimized scheduling and equal distribution of hours.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Timetable Configuration</CardTitle>
                <CardDescription>Set up the parameters for timetable generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
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
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">Course Allocation File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="file:mr-2 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:text-primary-foreground"
                    />
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {uploadedFile.name}
                    </div>
                  )}
                </div>

                <Separator />

                <Button
                  onClick={generateTimetable}
                  disabled={!department || !semester || !uploadedFile || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Timetable
                    </>
                  )}
                </Button>

                {generatedTimetable && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportTimetable("pdf")} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportTimetable("excel")} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generation Stats */}
            {generatedTimetable && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Generation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{generatedTimetable.conflicts}</div>
                      <div className="text-xs text-muted-foreground">Conflicts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{generatedTimetable.totalHours}</div>
                      <div className="text-xs text-muted-foreground">Total Hours</div>
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Timetable generated successfully with zero conflicts and optimized hour distribution.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Generated Timetable Display */}
          <div className="lg:col-span-2">
            {generatedTimetable ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Timetable</CardTitle>
                      <CardDescription>
                        {generatedTimetable.department} - Semester {generatedTimetable.semester}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Conflict-Free
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {generatedTimetable.totalHours}h/week
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="p-3 text-left font-medium text-muted-foreground">Time</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">Monday</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">Tuesday</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">Wednesday</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">Thursday</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">Friday</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">Saturday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedTimetable.schedule.map((slot, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="p-3 font-medium text-foreground">{slot.time}</td>
                            <td className="p-3">
                              <div
                                className={`rounded-md p-2 text-xs ${
                                  slot.monday === "Break"
                                    ? "bg-muted text-muted-foreground"
                                    : slot.monday.includes("Lab")
                                      ? "bg-secondary/20 text-secondary-foreground"
                                      : "bg-primary/10 text-primary-foreground"
                                }`}
                              >
                                {slot.monday}
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`rounded-md p-2 text-xs ${
                                  slot.tuesday === "Break"
                                    ? "bg-muted text-muted-foreground"
                                    : slot.tuesday.includes("Lab")
                                      ? "bg-secondary/20 text-secondary-foreground"
                                      : "bg-primary/10 text-primary-foreground"
                                }`}
                              >
                                {slot.tuesday}
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`rounded-md p-2 text-xs ${
                                  slot.wednesday === "Break"
                                    ? "bg-muted text-muted-foreground"
                                    : slot.wednesday.includes("Lab")
                                      ? "bg-secondary/20 text-secondary-foreground"
                                      : "bg-primary/10 text-primary-foreground"
                                }`}
                              >
                                {slot.wednesday}
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`rounded-md p-2 text-xs ${
                                  slot.thursday === "Break"
                                    ? "bg-muted text-muted-foreground"
                                    : slot.thursday.includes("Lab")
                                      ? "bg-secondary/20 text-secondary-foreground"
                                      : "bg-primary/10 text-primary-foreground"
                                }`}
                              >
                                {slot.thursday}
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`rounded-md p-2 text-xs ${
                                  slot.friday === "Break"
                                    ? "bg-muted text-muted-foreground"
                                    : slot.friday.includes("Lab")
                                      ? "bg-secondary/20 text-secondary-foreground"
                                      : "bg-primary/10 text-primary-foreground"
                                }`}
                              >
                                {slot.friday}
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`rounded-md p-2 text-xs ${
                                  slot.saturday === "Break" || slot.saturday.includes("Free")
                                    ? "bg-muted text-muted-foreground"
                                    : slot.saturday.includes("Lab")
                                      ? "bg-secondary/20 text-secondary-foreground"
                                      : "bg-primary/10 text-primary-foreground"
                                }`}
                              >
                                {slot.saturday}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex h-96 items-center justify-center">
                <CardContent className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">No Timetable Generated</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Upload a course allocation file and configure the settings to generate your timetable.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Zero Conflicts</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic detection and resolution of scheduling conflicts
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-secondary/10 p-3">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Faculty Optimization</h3>
                <p className="text-sm text-muted-foreground">Equal distribution of teaching hours across faculty</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-chart-2/10 p-3">
                <BookOpen className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Smart Scheduling</h3>
                <p className="text-sm text-muted-foreground">Balanced mix of lectures, labs, and practical sessions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
