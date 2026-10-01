import { Link } from "react-router-dom";
import { MapPin, Clock, Users, Bookmark, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/data/mockData";
import { useJobs } from "@/context/JobContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const typeColor: Record<string, string> = {
  "Full-time": "bg-success/10 text-success border-success/20",
  "Part-time": "bg-warning/10 text-warning border-warning/20",
  Contract: "bg-accent/10 text-accent border-accent/20",
  Remote: "bg-primary/10 text-primary border-primary/20",
};

const JobCard = ({ job, index = 0 }: { job: Job; index?: number }) => {
  const { isJobSaved, toggleSaveJob, hasApplied } = useJobs();
  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(job.id);
    if (!saved) {
      toast.success(`Saved "${job.title}" to your saved jobs`);
    } else {
      toast.info(`Removed "${job.title}" from saved jobs`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/jobs/${job.id}`}
        className="group block bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm shrink-0">
            {job.logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
              </div>

              <div className="flex items-center gap-1">
                {applied && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Applied
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`shrink-0 h-8 w-8 transition-colors ${
                    saved ? "text-primary fill-primary/20" : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={handleBookmarkClick}
                  title={saved ? "Remove from saved" : "Save job"}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? "fill-primary" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.postedAt}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.applicants} applicants</span>
            </div>

            <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-border/60">
              <Badge variant="outline" className={typeColor[job.type] || "bg-primary/10 text-primary"}>
                {job.type}
              </Badge>
              <span className="text-sm font-semibold text-foreground">{job.salary}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;
