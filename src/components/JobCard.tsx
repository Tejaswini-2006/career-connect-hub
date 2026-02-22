import { Link } from "react-router-dom";
import { MapPin, Clock, Users, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/data/mockData";
import { motion } from "framer-motion";

const typeColor: Record<string, string> = {
  "Full-time": "bg-success/10 text-success border-success/20",
  "Part-time": "bg-warning/10 text-warning border-warning/20",
  Contract: "bg-accent/10 text-accent border-accent/20",
  Remote: "bg-primary/10 text-primary border-primary/20",
};

const JobCard = ({ job, index = 0 }: { job: Job; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.35 }}
  >
    <Link
      to={`/jobs/${job.id}`}
      className="group block bg-card rounded-lg border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm shrink-0">
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
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={(e) => { e.preventDefault(); }}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.postedAt}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.applicants} applicants</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={typeColor[job.type]}>{job.type}</Badge>
              <span className="text-sm font-medium text-foreground">{job.salary}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default JobCard;
