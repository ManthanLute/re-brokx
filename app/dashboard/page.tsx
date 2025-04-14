"use client"

import { useState, useEffect } from "react"
import { Building, CreditCard, DollarSign, FileText, Users, Clock, Calendar, TrendingUp, Search, Plus } from "lucide-react";
import { format } from "date-fns"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,


  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddPropertyForm from "@/components/AddPropertyForm";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
// Sample data for charts
const revenueData = [
  { name: "Jan", revenue: 4500000 },
  { name: "Feb", revenue: 5200000 },
  { name: "Mar", revenue: 7800000 },
  { name: "Apr", revenue: 6300000 },
  { name: "May", revenue: 8900000 },
  { name: "Jun", revenue: 7200000 },
  { name: "Jul", revenue: 9500000 },
  { name: "Aug", revenue: 11000000 },
  { name: "Sep", revenue: 9800000 },
  { name: "Oct", revenue: 12500000 },
  { name: "Nov", revenue: 10800000 },
  { name: "Dec", revenue: 12545000 },
]

const leadSourceData = [
  { name: "Website", value: 35 },
  { name: "Referral", value: 25 },
  { name: "Social Media", value: 20 },
  { name: "Google Ads", value: 15 },
  { name: "Others", value: 5 },
]

const propertyTypeData = [
  { name: "Apartment", value: 45 },
  { name: "Villa", value: 20 },
  { name: "Penthouse", value: 15 },
  { name: "Townhouse", value: 10 },
  { name: "Others", value: 10 },
]

const dealStatusData = [
  { name: "New", value: 30 },
  { name: "Follow-up", value: 25 },
  { name: "Negotiation", value: 20 },
  { name: "Closed", value: 15 },
  { name: "Lost", value: 10 },
]

const COLORS = ["#4A9FE6", "#7CC2F5", "#1A5B9F", "#0F2A43", "#1E293B"]

export default function DashboardPage() {

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeAgents, setActiveAgents] = useState([

    { name: "Rahul Sharma", deals: 12, revenue: "₹45,00,000", avatar: "RS", growth: 15 },
    { name: "Priya Patel", deals: 9, revenue: "₹32,50,000", avatar: "PP", growth: 12 },
    { name: "Amit Kumar", deals: 7, revenue: "₹28,75,000", avatar: "AK", growth: 9 },
    { name: "Neha Singh", deals: 6, revenue: "₹22,00,000", avatar: "NS", growth: 7 },
  ])

  const [recentLeads, setRecentLeads] = useState([
    { name: "John Doe", source: "Website", status: "New", time: "2 hours ago", property: "3BHK in Mumbai" },
    { name: "Jane Smith", source: "Instagram", status: "Follow-up", time: "5 hours ago", property: "Villa in Dubai" },
    { name: "Robert Johnson", source: "Referral", status: "Negotiation", time: "1 day ago", property: "2BHK in Pune" },
    { name: "Emily Davis", source: "Google Ads", status: "New", time: "1 day ago", property: "Penthouse in Dubai" },
  ])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Filter agents based on search query
  const filteredAgents = activeAgents.filter((agent) => agent.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto transition-all duration-300 hover:shadow-md">
                <Plus className="mr-2 h-4 w-4" />Add Property
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
              </DialogHeader>

              <AddPropertyForm setIsOpen={setIsOpen} />

            </DialogContent>
          </Dialog>

                    <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button className="w-full sm:w-auto transition-all duration-300 hover:shadow-md">
            <FileText className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,45,000</div>

            <p className="text-xs text-muted-foreground">

              <span className="text-green-500 font-medium">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>

            <p className="text-xs text-muted-foreground">

              <span className="text-green-500 font-medium">+3</span> new this week
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,75,000</div>

            <p className="text-xs text-muted-foreground">

              <span className="text-amber-500 font-medium">5</span> invoices pending
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Inventory</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>

            <p className="text-xs text-muted-foreground">

              <span className="text-green-500 font-medium">+12</span> new listings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brokx-blue"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      value >= 10000000 ? `₹${(value / 10000000).toFixed(1)}Cr` : `₹${(value / 100000).toFixed(0)}L`
                    }
                  />
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(2)} Lakhs`, "Revenue"]} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#4A9FE6" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Performing Agents</CardTitle>
              <CardDescription>Based on closed deals this month</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="w-full pl-8 bg-gray-50 focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center justify-between animate-pulse">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                          <div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded mt-2"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 w-20 bg-gray-200 rounded"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded mt-2"></div>
                        </div>
                      </div>
                    ))
                : filteredAgents.map((agent, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between transition-all duration-300 hover:bg-gray-50 p-2 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-brokx-blue/20">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={agent.name} />
                          <AvatarFallback>{agent.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.deals} deals closed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{agent.revenue}</p>
                        <p className="text-xs text-green-500">
                          <TrendingUp className="inline h-3 w-3 mr-1" />
                          {agent.growth}%
                        </p>
                      </div>
                    </div>
                  ))}
              {!isLoading && filteredAgents.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">No agents found matching "{searchQuery}"</div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
            >
              <Users className="mr-2 h-4 w-4" />
              View All Agents
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest leads added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0 animate-pulse"
                      >
                        <div>
                          <div className="h-4 w-32 bg-gray-200 rounded"></div>
                          <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="h-6 w-16 bg-gray-200 rounded"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="h-4 w-20 bg-gray-200 rounded"></div>
                          <div className="h-8 w-16 bg-gray-200 rounded mt-2"></div>
                        </div>
                      </div>
                    ))
                : recentLeads.map((lead, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0 transition-all duration-300 hover:bg-gray-50 p-2 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.property}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {lead.source}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              lead.status === "New"
                                ? "bg-blue-50 text-blue-600 border-blue-200"
                                : lead.status === "Follow-up"
                                  ? "bg-amber-50 text-amber-600 border-amber-200"
                                  : "bg-green-50 text-green-600 border-green-200"
                            }`}
                          >
                            {lead.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {lead.time}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
            >
              <Users className="mr-2 h-4 w-4" />
              View All Leads
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-4 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Payments due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 animate-pulse"
                      >
                        <div>
                          <div className="h-4 w-32 bg-gray-200 rounded"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded mt-2"></div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="h-4 w-20 bg-gray-200 rounded"></div>
                          <div className="h-6 w-16 bg-gray-200 rounded mt-2"></div>
                        </div>
                      </div>
                    ))
                : [
                    {
                      client: "Prestige Group",
                      amount: "₹12,50,000",
                      due: "Mar 15, 2025",
                      type: "Builder Brokerage",
                      status: "Pending",
                    },
                    {
                      client: "Rahul Sharma",
                      amount: "₹2,75,000",
                      due: "Mar 18, 2025",
                      type: "Agent Commission",
                      status: "Processing",
                    },
                    {
                      client: "Godrej Properties",
                      amount: "₹8,25,000",
                      due: "Mar 25, 2025",
                      type: "Builder Brokerage",
                      status: "Pending",
                    },
                    {
                      client: "Priya Patel",
                      amount: "₹1,85,000",
                      due: "Apr 2, 2025",
                      type: "Agent Commission",
                      status: "Pending",
                    },
                  ].map((payment, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 transition-all duration-300 hover:bg-gray-50 p-2 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">{payment.client}</p>
                        <p className="text-xs text-muted-foreground">{payment.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Due: {payment.due}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">{payment.amount}</p>
                        <Badge
                          variant="outline"
                          className={`mt-1 ${
                            payment.status === "Pending"
                              ? "bg-amber-50 text-amber-600 border-amber-200"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                          }`}
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full transition-all duration-300 hover:bg-brokx-blue/10 hover:text-brokx-blue"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              View All Payments
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of leads by source</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brokx-blue"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Distribution of properties by type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brokx-blue"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Deal Status</CardTitle>
            <CardDescription>Current status of all deals</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brokx-blue"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dealStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dealStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

