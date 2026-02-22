import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Briefcase, DollarSign, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockJobs } from "@/data/mockData";
import { motion } from "framer-motion";

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">Job not found</h2>
            <Button asChild className="mt-4"><Link to="/jobs">Back to Jobs</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-hero-gradient py-8">
        <div className="container mx-auto px-4">
          <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4">
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
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-xl shrink-0">
              {job.logo}
            </div>
            <div className="flex-1">
              <h1 className="font-display font-bold text-2xl text-foreground">{job.title}</h1>
              <p className="text-muted-foreground mt-1">{job.company}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.type}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.postedAt}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{job.applicants} applicants</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="icon"><Bookmark className="w-4 h-4" /></Button>
              <Button asChild><Link to="/login">Apply Now</Link></Button>
            </div>
          </div>

          <hr className="my-6 border-border" />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="font-semibold text-foreground mb-2">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-2">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((r) => (
                    <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="bg-muted/50 rounded-lg p-5 space-y-4">
                <h3 className="font-semibold text-foreground text-sm">Job Overview</h3>
                {[
                  { label: "Category", value: job.category },
                  { label: "Type", value: job.type },
                  { label: "Location", value: job.location },
                  { label: "Salary", value: job.salary },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
