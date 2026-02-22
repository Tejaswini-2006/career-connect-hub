import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, LayoutDashboard, FileText, Heart, Settings, LogOut,
  Users, PlusCircle, BarChart3, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Role = "applicant" | "recruiter" | "admin";

const sidebarItems: Record<Role, { icon: any; label: string; key: string }[]> = {
  applicant: [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
    { icon: FileText, label: "My Applications", key: "applications" },
    { icon: Heart, label: "Saved Jobs", key: "saved" },
    { icon: Settings, label: "Profile", key: "profile" },
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
    { icon: Settings, label: "Settings", key: "settings" },
  ],
};

const statsData: Record<Role, { label: string; value: string }[]> = {
  applicant: [
    { label: "Applications Sent", value: "12" },
    { label: "Interview Invites", value: "3" },
    { label: "Saved Jobs", value: "8" },
    { label: "Profile Views", value: "47" },
  ],
  recruiter: [
    { label: "Active Listings", value: "5" },
    { label: "Total Applicants", value: "128" },
    { label: "Shortlisted", value: "24" },
    { label: "Hires This Month", value: "3" },
  ],
  admin: [
    { label: "Total Users", value: "2,450" },
    { label: "Pending Approvals", value: "18" },
    { label: "Active Jobs", value: "342" },
    { label: "Reports", value: "5" },
  ],
};

const Dashboard = () => {
  const [role, setRole] = useState<Role>("applicant");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className="flex items-center gap-2.5 p-4 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display font-bold text-sm">JobFlow</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems[role].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === item.key
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && item.label}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-sidebar-border space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" />Collapse</>}
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Sign Out"}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-background">
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="font-display font-semibold text-lg text-foreground capitalize">{activeTab}</h1>
          {/* Role switcher for demo */}
          <div className="flex items-center gap-2">
            {(["applicant", "recruiter", "admin"] as Role[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={role === r ? "default" : "outline"}
                onClick={() => { setRole(r); setActiveTab("dashboard"); }}
                className="capitalize text-xs"
              >
                {r}
              </Button>
            ))}
          </div>
        </header>

        <div className="p-6">
          <motion.div
            key={`${role}-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {statsData[role].map((stat, i) => (
                    <div key={stat.label} className="bg-card rounded-xl border border-border p-5 shadow-card">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-display font-bold text-2xl text-foreground mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <p className="text-sm text-muted-foreground">
                          {role === "applicant" && `Application #${n} status updated`}
                          {role === "recruiter" && `New applicant for Job Listing #${n}`}
                          {role === "admin" && `New ${n === 1 ? "recruiter" : "job"} pending approval`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "dashboard" && (
              <div className="bg-card rounded-xl border border-border p-8 shadow-card text-center">
                <p className="text-muted-foreground">
                  <span className="font-semibold capitalize">{activeTab}</span> — This section will be available once the backend is connected.
                </p>
                <p className="text-sm text-muted-foreground mt-2">Enable Lovable Cloud to activate full functionality.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
