import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Briefcase, DollarSign, Bookmark, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const JobDetail = () => {
  const { id } = useParams();
  const { jobs, isJobSaved, toggleSaveJob, applyForJob, hasApplied } = useJobs();
  const { user } = useAuth();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState(user?.name || "");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">Job position not found</h2>
            <p className="text-sm text-muted-foreground mt-1">The listing may have been removed or updated.</p>
            <Button asChild className="mt-4">
              <Link to="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  const handleBookmarkToggle = () => {
    toggleSaveJob(job.id);
    if (!saved) {
      toast.success(`Saved "${job.title}" to your bookmarked jobs`);
    } else {
      toast.info(`Removed "${job.title}" from saved jobs`);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const success = applyForJob(job.id, notes, applicantName, applicantEmail);
    if (success) {
      toast.success(`Application submitted for ${job.title} at ${job.company}!`);
      setApplyModalOpen(false);
    } else {
      toast.info("You have already submitted an application for this position.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-hero-gradient py-8">
        <div className="container mx-auto px-4">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10 pb-16 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-xl shrink-0">
              {job.logo}
            </div>

            <div className="flex-1">
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">{job.title}</h1>
              <p className="text-lg font-medium text-primary mt-1">{job.company}</p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{job.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" />{job.type}</span>
                <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-primary" />{job.salary}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />Posted {job.postedAt}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{job.applicants} applicants</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBookmarkToggle}
                className={saved ? "text-primary border-primary bg-primary/5" : ""}
                title={saved ? "Remove Bookmark" : "Save Job"}
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-primary" : ""}`} />
              </Button>

              {applied ? (
                <Button disabled className="bg-success/20 text-success border border-success/30 cursor-default">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Application Submitted
                </Button>
              ) : (
                <Button size="lg" onClick={() => setApplyModalOpen(true)}>
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          <hr className="my-8 border-border" />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground mb-3">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-lg text-foreground mb-3">Key Requirements</h2>
                <ul className="space-y-2.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-muted/40 border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-display font-semibold text-foreground text-base">Job Summary</h3>
                {[
                  { label: "Category", value: job.category },
                  { label: "Employment Type", value: job.type },
                  { label: "Location", value: job.location },
                  { label: "Offered Salary", value: job.salary },
                  { label: "Total Applicants", value: `${job.applicants} Candidates` },
                ].map((item) => (
                  <div key={item.label} className="pb-3 border-b border-border/60 last:border-0 last:pb-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Application Dialog Modal */}
      <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Submit your application details directly to {job.company}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplySubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="applicant-name">Full Name *</Label>
              <Input
                id="applicant-name"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="applicant-email">Email Address *</Label>
              <Input
                id="applicant-email"
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="applicant-notes">Cover Note / Experience (Optional)</Label>
              <Textarea
                id="applicant-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Highlight your relevant skills or experience for this position..."
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Send className="w-4 h-4 mr-2" /> Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default JobDetail;
