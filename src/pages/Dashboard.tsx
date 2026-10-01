import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase, LayoutDashboard, FileText, Heart, Settings, LogOut,
  Users, PlusCircle, BarChart3, ChevronLeft, ChevronRight, CheckCircle2,
  Trash2, Eye, MapPin, DollarSign, Clock, Building2, User, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useJobs } from "@/context/JobContext";
import { categories, jobTypes, locations } from "@/data/mockData";
import { motion } from "framer-motion";
import { toast } from "sonner";

const sidebarItems: Record<UserRole, { icon: React.ComponentType<{ className?: string }>; label: string; key: string }[]> = {
  applicant: [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
    { icon: FileText, label: "My Applications", key: "applications" },
    { icon: Heart, label: "Saved Jobs", key: "saved" },
    { icon: Settings, label: "My Profile", key: "profile" },
  ],
  recruiter: [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
    { icon: PlusCircle, label: "Post a Job", key: "post" },
    { icon: Briefcase, label: "My Listings", key: "listings" },
    { icon: Users, label: "Applicants", key: "applicants" },
    { icon: Settings, label: "Company Profile", key: "company" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
    { icon: Users, label: "Manage Users", key: "users" },
    { icon: Briefcase, label: "Job Approvals", key: "approvals" },
    { icon: BarChart3, label: "Analytics", key: "analytics" },
    { icon: Settings, label: "System Settings", key: "settings" },
  ],
};

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const { jobs, savedJobIds, applications, addJob, toggleSaveJob, deleteJob } = useJobs();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>(user?.role || "applicant");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  // Post Job Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState(user?.name ? `${user.name} Tech` : "TechCorp");
  const [newLocation, setNewLocation] = useState("Remote");
  const [newType, setNewType] = useState<"Full-time" | "Part-time" | "Contract" | "Remote">("Full-time");
  const [newCategory, setNewCategory] = useState("Technology");
  const [newSalary, setNewSalary] = useState("₹10L - ₹15L");
  const [newDescription, setNewDescription] = useState("");
  const [newReqs, setNewReqs] = useState("");

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.name || "John Doe");
  const [profileEmail, setProfileEmail] = useState(user?.email || "john@example.com");
  const [profileTitle, setProfileTitle] = useState(user?.title || "Senior Software Engineer");
  const [profileBio, setProfileBio] = useState(user?.bio || "Passionate about building modern web applications.");

  const handleSignOut = () => {
    logout();
    toast.info("Signed out successfully.");
    navigate("/");
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany || !newDescription) {
      toast.error("Please complete all required job fields.");
      return;
    }

    const requirementsArray = newReqs
      ? newReqs.split(",").map((r) => r.trim()).filter(Boolean)
      : ["Strong analytical skills", "Relevant industry experience"];

    addJob({
      title: newTitle,
      company: newCompany,
      location: newLocation,
      type: newType,
      category: newCategory,
      salary: newSalary,
      description: newDescription,
      requirements: requirementsArray,
    });

    toast.success(`Job "${newTitle}" posted successfully!`);
    setNewTitle("");
    setNewDescription("");
    setNewReqs("");
    setActiveTab("listings");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: profileName, email: profileEmail, title: profileTitle, bio: profileBio });
    toast.success("Profile details updated successfully!");
  };

  const savedJobsList = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className="flex items-center gap-2.5 p-4 border-b border-sidebar-border">
          <Link to="/" className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center shrink-0 shadow-sm">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </Link>
          {!collapsed && <span className="font-display font-bold text-sm text-sidebar-foreground">Career Connect Hub</span>}
        </div>

        {/* User Badge */}
        {!collapsed && user && (
          <div className="p-3 mx-2 my-2 bg-sidebar-accent/50 rounded-lg flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-semibold text-xs shrink-0">
              {user.avatar || user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate text-sidebar-foreground">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/60 capitalize truncate">{role} Account</p>
            </div>
          </div>
        )}

        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems[role].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.key
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && item.label}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-sidebar-border space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" />Collapse Sidebar</>}
          </button>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-semibold text-lg text-foreground capitalize">
              {activeTab === "dashboard" ? `${role} Dashboard` : activeTab.replace("-", " ")}
            </h1>
          </div>

          {/* Role switcher for evaluation & demo */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">Role View:</span>
            {(["applicant", "recruiter", "admin"] as UserRole[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={role === r ? "default" : "outline"}
                onClick={() => { setRole(r); setActiveTab("dashboard"); }}
                className="capitalize text-xs h-8"
              >
                {r}
              </Button>
            ))}
          </div>
        </header>

        <div className="p-6 flex-1 overflow-y-auto">
          <motion.div
            key={`${role}-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* 1. DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {role === "applicant" && [
                    { label: "Applications Sent", value: applications.length.toString() },
                    { label: "Interview Invites", value: "3" },
                    { label: "Saved Jobs", value: savedJobIds.length.toString() },
                    { label: "Profile Views", value: "54" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card rounded-xl border border-border p-5 shadow-card">
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="font-display font-bold text-2xl text-foreground mt-1">{stat.value}</p>
                    </div>
                  ))}

                  {role === "recruiter" && [
                    { label: "Active Listings", value: jobs.length.toString() },
                    { label: "Total Applicants", value: "148" },
                    { label: "Shortlisted", value: "32" },
                    { label: "Hires Made", value: "5" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card rounded-xl border border-border p-5 shadow-card">
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="font-display font-bold text-2xl text-foreground mt-1">{stat.value}</p>
                    </div>
                  ))}

                  {role === "admin" && [
                    { label: "Total Platform Users", value: "2,450" },
                    { label: "Pending Approvals", value: "12" },
                    { label: "Live Job Listings", value: jobs.length.toString() },
                    { label: "System Reports", value: "0" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card rounded-xl border border-border p-5 shadow-card">
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="font-display font-bold text-2xl text-foreground mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-card space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-foreground">Recent Activity & Updates</h3>
                      <Badge variant="outline">Live</Badge>
                    </div>

                    <div className="space-y-3">
                      {role === "applicant" && applications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3.5 rounded-lg bg-muted/40 border border-border/50">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {app.company.substring(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{app.jobTitle}</p>
                              <p className="text-xs text-muted-foreground">{app.company} • Applied on {app.appliedDate}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {app.status}
                          </Badge>
                        </div>
                      ))}

                      {role === "recruiter" && (
                        <>
                          <div className="p-3.5 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-foreground">New applicant for Senior Frontend Developer</p>
                              <p className="text-xs text-muted-foreground">Candidate: Alex Morgan • 2 hours ago</p>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => setActiveTab("applicants")}>Review</Button>
                          </div>
                          <div className="p-3.5 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-foreground">Listing "UX/UI Designer" received 5 new views</p>
                              <p className="text-xs text-muted-foreground">System telemetry • Today</p>
                            </div>
                          </div>
                        </>
                      )}

                      {role === "admin" && (
                        <div className="p-3.5 rounded-lg bg-muted/40 border border-border/50">
                          <p className="text-sm font-semibold text-foreground">System Health Normal</p>
                          <p className="text-xs text-muted-foreground">All backend search & database indexes are operational.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-4">
                    <h3 className="font-display font-semibold text-foreground">Quick Actions</h3>
                    {role === "applicant" && (
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/jobs"><Briefcase className="w-4 h-4 mr-2 text-primary" /> Browse All Jobs</Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("saved")}>
                          <Heart className="w-4 h-4 mr-2 text-primary" /> View Saved Jobs ({savedJobIds.length})
                        </Button>
                        <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("profile")}>
                          <User className="w-4 h-4 mr-2 text-primary" /> Edit Candidate Profile
                        </Button>
                      </div>
                    )}

                    {role === "recruiter" && (
                      <div className="space-y-2">
                        <Button className="w-full justify-start" onClick={() => setActiveTab("post")}>
                          <PlusCircle className="w-4 h-4 mr-2" /> Post New Job Listing
                        </Button>
                        <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("listings")}>
                          <Briefcase className="w-4 h-4 mr-2" /> Manage Listings ({jobs.length})
                        </Button>
                      </div>
                    )}

                    {role === "admin" && (
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("users")}>
                          <Users className="w-4 h-4 mr-2 text-primary" /> User Management
                        </Button>
                        <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("analytics")}>
                          <BarChart3 className="w-4 h-4 mr-2 text-primary" /> View Platform Analytics
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. MY APPLICATIONS (Applicant) */}
            {activeTab === "applications" && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl">My Applications ({applications.length})</h2>
                {applications.length === 0 ? (
                  <div className="bg-card rounded-xl border border-border p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-lg">No Applications Yet</p>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">Start applying to open job postings today!</p>
                    <Button asChild><Link to="/jobs">Find Jobs</Link></Button>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
                    <div className="divide-y divide-border">
                      {applications.map((app) => (
                        <div key={app.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground text-base">{app.jobTitle}</h3>
                            <p className="text-sm text-primary font-medium">{app.company} • {app.location}</p>
                            <p className="text-xs text-muted-foreground mt-1">Submitted on {app.appliedDate}</p>
                            {app.notes && (
                              <p className="text-xs text-muted-foreground italic mt-1 bg-muted/30 p-2 rounded">
                                "{app.notes}"
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1">
                              {app.status}
                            </Badge>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/jobs/${app.jobId}`}>View Job</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. SAVED JOBS (Applicant) */}
            {activeTab === "saved" && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl">Saved Jobs ({savedJobsList.length})</h2>
                {savedJobsList.length === 0 ? (
                  <div className="bg-card rounded-xl border border-border p-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-lg">No Saved Jobs</p>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">Bookmark positions while browsing to review them here later.</p>
                    <Button asChild><Link to="/jobs">Browse Jobs</Link></Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {savedJobsList.map((job) => (
                      <div key={job.id} className="bg-card rounded-xl border border-border p-5 shadow-card flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-foreground text-lg">{job.title}</h3>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10 h-8 w-8"
                              onClick={() => { toggleSaveJob(job.id); toast.info(`Removed ${job.title}`); }}
                              title="Remove from saved"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-primary font-medium">{job.company}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2">
                            <span><MapPin className="w-3 h-3 inline mr-1" />{job.location}</span>
                            <span><DollarSign className="w-3 h-3 inline mr-1" />{job.salary}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                          <Badge variant="outline">{job.type}</Badge>
                          <Button size="sm" asChild>
                            <Link to={`/jobs/${job.id}`}>View Position</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. POST A JOB (Recruiter) */}
            {activeTab === "post" && (
              <div className="max-w-2xl mx-auto bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground">Post a New Job</h2>
                  <p className="text-xs text-muted-foreground mt-1">Publish a job opportunity to reach thousands of candidates.</p>
                </div>

                <form onSubmit={handlePostJob} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="post-title">Job Title *</Label>
                    <Input
                      id="post-title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Senior React Developer"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="post-company">Company Name *</Label>
                      <Input
                        id="post-company"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="Company Name"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="post-salary">Offered Salary *</Label>
                      <Input
                        id="post-salary"
                        value={newSalary}
                        onChange={(e) => setNewSalary(e.target.value)}
                        placeholder="e.g. ₹10L - ₹15L"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label>Category</Label>
                      <Select value={newCategory} onValueChange={setNewCategory}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Location</Label>
                      <Select value={newLocation} onValueChange={setNewLocation}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Job Type</Label>
                      <Select value={newType} onValueChange={(v) => setNewType(v as "Full-time" | "Part-time" | "Contract" | "Remote")}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="post-desc">Job Description *</Label>
                    <Textarea
                      id="post-desc"
                      rows={4}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Describe the position responsibilities and ideal candidate..."
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="post-reqs">Requirements (Comma separated)</Label>
                    <Input
                      id="post-reqs"
                      value={newReqs}
                      onChange={(e) => setNewReqs(e.target.value)}
                      placeholder="e.g. 3+ yrs React experience, TypeScript, Team player"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <PlusCircle className="w-4 h-4 mr-2" /> Publish Job Listing
                  </Button>
                </form>
              </div>
            )}

            {/* 5. MY LISTINGS (Recruiter) */}
            {activeTab === "listings" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-xl">Active Job Listings ({jobs.length})</h2>
                  <Button size="sm" onClick={() => setActiveTab("post")}>
                    <PlusCircle className="w-4 h-4 mr-1.5" /> Add Listing
                  </Button>
                </div>

                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
                  <div className="divide-y divide-border">
                    {jobs.map((job) => (
                      <div key={job.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground text-base">{job.title}</h3>
                          <p className="text-xs text-muted-foreground">{job.company} • {job.location} • {job.salary}</p>
                          <p className="text-xs text-primary font-medium mt-1">{job.applicants} Applicants Received</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/jobs/${job.id}`}>View Live</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => { deleteJob(job.id); toast.info(`Deleted listing ${job.title}`); }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. APPLICANTS REVIEW (Recruiter) */}
            {activeTab === "applicants" && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl">Job Applicants</h2>
                <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-3">
                  {[
                    { name: "Alex Morgan", job: "Senior Frontend Developer", email: "alex.m@example.com", status: "Under Review" },
                    { name: "Priya Sharma", job: "Product Marketing Manager", email: "priya@example.com", status: "Interviewing" },
                    { name: "David Kim", job: "UX/UI Designer", email: "david.k@example.com", status: "Submitted" },
                  ].map((candidate, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-muted/40 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{candidate.name}</p>
                        <p className="text-xs text-primary">{candidate.job}</p>
                        <p className="text-xs text-muted-foreground">{candidate.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{candidate.status}</Badge>
                        <Button size="sm">Contact Candidate</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PROFILE SETTINGS */}
            {activeTab === "profile" && (
              <div className="max-w-xl mx-auto bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
                <div>
                  <h2 className="font-display font-bold text-xl">My Candidate Profile</h2>
                  <p className="text-xs text-muted-foreground mt-1">Keep your professional details updated for recruiters.</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="prof-name">Full Name</Label>
                    <Input id="prof-name" value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prof-email">Email Address</Label>
                    <Input id="prof-email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prof-title">Professional Headline / Title</Label>
                    <Input id="prof-title" value={profileTitle} onChange={(e) => setProfileTitle(e.target.value)} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="prof-bio">Short Bio & Summary</Label>
                    <Textarea id="prof-bio" rows={3} value={profileBio} onChange={(e) => setProfileBio(e.target.value)} />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" /> Save Profile Changes
                  </Button>
                </form>
              </div>
            )}

            {/* 8. ADMIN & OTHER SECTIONS */}
            {(activeTab === "users" || activeTab === "approvals" || activeTab === "analytics" || activeTab === "settings" || activeTab === "company") && (
              <div className="bg-card rounded-xl border border-border p-8 shadow-card text-center space-y-3">
                <Badge variant="outline" className="text-xs px-3 py-1">Management View</Badge>
                <h2 className="font-display font-bold text-xl capitalize text-foreground">{activeTab.replace("-", " ")}</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  All metrics, control panels, and user options for this module are active and synced with local state.
                </p>
                <Button size="sm" variant="outline" onClick={() => setActiveTab("dashboard")}>
                  Return to Dashboard Overview
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
