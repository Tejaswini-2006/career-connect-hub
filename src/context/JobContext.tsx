import React, { createContext, useContext, useState, useEffect } from "react";
import { Job, mockJobs } from "@/data/mockData";

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: "Submitted" | "Under Review" | "Interview" | "Accepted" | "Rejected";
  notes?: string;
  applicantName?: string;
  applicantEmail?: string;
}

interface JobContextType {
  jobs: Job[];
  savedJobIds: string[];
  applications: JobApplication[];
  addJob: (jobData: Omit<Job, "id" | "postedAt" | "applicants" | "logo">) => Job;
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyForJob: (jobId: string, notes?: string, name?: string, email?: string) => boolean;
  hasApplied: (jobId: string) => boolean;
  deleteJob: (jobId: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const JOBS_STORAGE_KEY = "career_connect_jobs";
const SAVED_STORAGE_KEY = "career_connect_saved_jobs";
const APPS_STORAGE_KEY = "career_connect_applications";

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(JOBS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved jobs", e);
      }
    }
    return mockJobs;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(SAVED_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved job IDs", e);
      }
    }
    return ["1", "3"];
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(APPS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved applications", e);
      }
    }
    return [
      {
        id: "app_1",
        jobId: "1",
        jobTitle: "Senior Frontend Developer",
        company: "TechNova Inc.",
        location: "San Francisco, CA",
        appliedDate: "Oct 01, 2026",
        status: "Under Review",
        notes: "Excited about this role!",
      },
      {
        id: "app_2",
        jobId: "2",
        jobTitle: "Product Marketing Manager",
        company: "GrowthLab",
        location: "New York, NY",
        appliedDate: "Sep 28, 2026",
        status: "Interview",
        notes: "Scheduled for Round 1.",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const addJob = (jobData: Omit<Job, "id" | "postedAt" | "applicants" | "logo">): Job => {
    const newJob: Job = {
      ...jobData,
      id: "job_" + Date.now(),
      postedAt: "Just now",
      applicants: 0,
      logo: jobData.company.substring(0, 2).toUpperCase(),
    };
    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const isJobSaved = (jobId: string): boolean => {
    return savedJobIds.includes(jobId);
  };

  const applyForJob = (jobId: string, notes = "", name = "User", email = "user@example.com"): boolean => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;

    if (applications.some((app) => app.jobId === jobId)) {
      return false; // Already applied
    }

    const newApp: JobApplication = {
      id: "app_" + Date.now(),
      jobId,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      appliedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Submitted",
      notes,
      applicantName: name,
      applicantEmail: email,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increment applicants count
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicants: j.applicants + 1 } : j))
    );

    return true;
  };

  const hasApplied = (jobId: string): boolean => {
    return applications.some((app) => app.jobId === jobId);
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobIds,
        applications,
        addJob,
        toggleSaveJob,
        isJobSaved,
        applyForJob,
        hasApplied,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
