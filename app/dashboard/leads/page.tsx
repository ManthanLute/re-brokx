"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  User,
  Building,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Sample lead data
const allLeads = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    status: "New",
    source: "Website",
    date: "Mar 10, 2025",
    property: "3BHK in Mumbai",
    assigned: "Rahul Sharma",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 9876543211",
    status: "Follow-up",
    source: "Instagram",
    date: "Mar 9, 2025",
    property: "Villa in Dubai",
    assigned: "Priya Patel",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+91 9876543212",
    status: "Negotiation",
    source: "Referral",
    date: "Mar 8, 2025",
    property: "2BHK in Pune",
    assigned: "Amit Kumar",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+91 9876543213",
    status: "New",
    source: "Google Ads",
    date: "Mar 7, 2025",
    property: "Penthouse in Dubai",
    assigned: "Neha Singh",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.w@example.com",
    phone: "+91 9876543214",
    status: "Closed",
    source: "Facebook",
    date: "Mar 6, 2025",
    property: "4BHK in Mumbai",
    assigned: "Rahul Sharma",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    phone: "+91 9876543215",
    status: "Lost",
    source: "Website",
    date: "Mar 5, 2025",
    property: "1BHK in Nashik",
    assigned: "Priya Patel",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.m@example.com",
    phone: "+91 9876543216",
    status: "Follow-up",
    source: "WhatsApp",
    date: "Mar 4, 2025",
    property: "3BHK in Pune",
    assigned: "Amit Kumar",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer.t@example.com",
    phone: "+91 9876543217",
    status: "Negotiation",
    source: "Referral",
    date: "Mar 3, 2025",
    property: "Villa in Dubai",
    assigned: "Neha Singh",
  },
]

export default function LeadsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [leads, setLeads] = useState(allLeads)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [filters, setFilters] = useState({
    status: [] as string[],
    source: [] as string[],
    assigned: "",
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Apply filters
  const applyFilters = () => {
    let filteredLeads = [...allLeads]

    // Filter by tab (status)
    if (selectedTab !== "all") {
      filteredLeads = filteredLeads.filter((lead) => lead.status.toLowerCase() === selectedTab)
    }

    // Filter by search query
    if (searchQuery) {
      filteredLeads = filteredLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone.includes(searchQuery) ||
          lead.property.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status checkboxes
    if (filters.status.length > 0) {
      filteredLeads = filteredLeads.filter((lead) => filters.status.includes(lead.status))
    }

    // Filter by source checkboxes
    if (filters.source.length > 0) {
      filteredLeads = filteredLeads.filter((lead) => filters.source.includes(lead.source))
    }

    // Filter by assigned agent
    if (filters.assigned) {
      filteredLeads = filteredLeads.filter((lead) => lead.assigned === filters.assigned)
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      // In a real app, you'd parse the date strings properly
      // This is a simplified version
      filteredLeads = filteredLeads.filter((lead) => {
        const leadDate = new Date(lead.date)
        return leadDate >= dateRange.from! && leadDate <= dateRange.to!
      })
    }

    setLeads(filteredLeads)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      status: [],
      source: [],
      assigned: "",
    })
    setDateRange({ from: undefined, to: undefined })
    setSearchQuery("")
    setLeads(allLeads)
  }

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    setFilters((prev) => {
      const newStatus = [...prev.status]
      if (newStatus.includes(status)) {
        return { ...prev, status: newStatus.filter((s) => s !== status) }
      } else {
        return { ...prev, status: [...newStatus, status] }
      }
    })
  }

  // Toggle source filter
  const toggleSourceFilter = (source: string) => {
    setFilters((prev) => {
      const newSource = [...prev.source]
      if (newSource.includes(source)) {
        return { ...prev, source: newSource.filter((s) => s !== source) }
      } else {
        return { ...prev, source: [...newSource, source] }
      }
    })
  }

  // Handle assigned agent change
  const handleAssignedChange = (value: string) => {
    setFilters((prev) => ({ ...prev, assigned: value }))
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = leads.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(leads.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Apply filters effect
  useEffect(() => {
    applyFilters()
  }, [selectedTab, filters, dateRange])

  // Apply search on submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lead Management</h2>
          <p className="text-muted-foreground">Manage and track all your leads in one place</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:shadow-md hover:bg-brokx-blue/10 hover:text-brokx-blue"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:shadow-md hover:bg-brokx-blue/10 hover:text-brokx-blue"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-md">
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 lg:w-72">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Quick Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Lead Status</Label>
                <div className="space-y-1">
                  {["New", "Follow-up", "Negotiation", "Closed", "Lost"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status.toLowerCase()}`}
                        checked={filters.status.includes(status)}
                        onCheckedChange={() => toggleStatusFilter(status)}
                        className="data-[state=checked]:bg-brokx-blue data-[state=checked]:border-brokx-blue"
                      />
                      <label
                        htmlFor={`status-${status.toLowerCase()}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Lead Source</Label>
                <div className="space-y-1">
                  {["Website", "Instagram", "Facebook", "Google Ads", "Referral", "WhatsApp"].map((source) => (
                    <div key={source} className="flex items-center space-x-2">
                      <Checkbox
                        id={`source-${source.toLowerCase().replace(" ", "-")}`}
                        checked={filters.source.includes(source)}
                        onCheckedChange={() => toggleSourceFilter(source)}
                        className="data-[state=checked]:bg-brokx-blue data-[state=checked]:border-brokx-blue"
                      />
                      <label
                        htmlFor={`source-${source.toLowerCase().replace(" ", "-")}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {source}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Select value={filters.assigned} onValueChange={handleAssignedChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
                    <SelectItem value="Priya Patel">Priya Patel</SelectItem>
                    <SelectItem value="Amit Kumar">Amit Kumar</SelectItem>
                    <SelectItem value="Neha Singh">Neha Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  {dateRange.from && dateRange.to && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateRange({ from: undefined, to: undefined })}
                      className="mt-1"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear Date Range
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={applyFilters}
                  className="flex-1 bg-gradient-to-r from-brokx-blue to-brokx-blue-light hover:from-brokx-blue-dark hover:to-brokx-blue transition-all duration-300 shadow-md"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Leads ({leads.length})</CardTitle>
                <form onSubmit={handleSearch} className="relative w-full md:w-64 lg:w-80">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    className="w-full pl-8 bg-gray-50 focus:bg-white transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all" className="data-[state=active]:bg-brokx-blue data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="new" className="data-[state=active]:bg-brokx-blue data-[state=active]:text-white">
                    New
                  </TabsTrigger>
                  <TabsTrigger
                    value="follow-up"
                    className="data-[state=active]:bg-brokx-blue data-[state=active]:text-white"
                  >
                    Follow-up
                  </TabsTrigger>
                  <TabsTrigger
                    value="negotiation"
                    className="data-[state=active]:bg-brokx-blue data-[state=active]:text-white"
                  >
                    Negotiation
                  </TabsTrigger>
                  <TabsTrigger
                    value="closed"
                    className="data-[state=active]:bg-brokx-blue data-[state=active]:text-white"
                  >
                    Closed
                  </TabsTrigger>
                  <TabsTrigger
                    value="lost"
                    className="data-[state=active]:bg-brokx-blue data-[state=active]:text-white"
                  >
                    Lost
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg animate-pulse"
                      >
                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="h-3 w-40 bg-gray-200 rounded"></div>
                            <div className="flex gap-2">
                              <div className="h-6 w-16 bg-gray-200 rounded"></div>
                              <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))
                ) : currentItems.length > 0 ? (
                  currentItems.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-4 mb-4 md:mb-0">
                        <Avatar className="h-10 w-10 border-2 border-brokx-blue/20">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={lead.name} />
                          <AvatarFallback>
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{lead.name}</h3>
                            <Badge
                              variant="outline"
                              className={`
                                ${lead.status === "New" ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
                                ${lead.status === "Follow-up" ? "bg-amber-50 text-amber-600 border-amber-200" : ""}
                                ${lead.status === "Negotiation" ? "bg-purple-50 text-purple-600 border-purple-200" : ""}
                                ${lead.status === "Closed" ? "bg-green-50 text-green-600 border-green-200" : ""}
                                ${lead.status === "Lost" ? "bg-red-50 text-red-600 border-red-200" : ""}
                              `}
                            >
                              {lead.status}
                            </Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {lead.email}
                            </div>
                            <div className="hidden sm:block">•</div>
                            <div className="flex items-center">
                              <Phone className="mr-1 h-3 w-3" />
                              {lead.phone}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {lead.date}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {lead.assigned}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {lead.property}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                        >
                          <Phone className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Call</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Email</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Message</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-brokx-blue/10 hover:text-brokx-blue focus:bg-brokx-blue/10 focus:text-brokx-blue">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-brokx-blue/10 hover:text-brokx-blue focus:bg-brokx-blue/10 focus:text-brokx-blue">
                              Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-brokx-blue/10 hover:text-brokx-blue focus:bg-brokx-blue/10 focus:text-brokx-blue">
                              Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-brokx-blue/10 hover:text-brokx-blue focus:bg-brokx-blue/10 focus:text-brokx-blue">
                              Add Note
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50">
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-gray-100 p-3 mb-4">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">No leads found</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
                    </p>
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{currentItems.length}</strong> of <strong>{leads.length}</strong> leads
              </p>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(i + 1)}
                        className={cn(
                          "transition-all duration-300",
                          currentPage === i + 1
                            ? "bg-brokx-blue hover:bg-brokx-blue-dark"
                            : "hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30",
                        )}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue hover:border-brokx-blue/30"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

