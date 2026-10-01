import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import { categories } from "@/data/mockData";
import { useJobs } from "@/context/JobContext";
import { motion } from "framer-motion";

const features = [
  { icon: Building2, title: "Top Companies", desc: "Connect with verified, leading employers across every major industry." },
  { icon: Users, title: "Smart Matching", desc: "Filter and find relevant opportunities aligned with your expertise." },
  { icon: Shield, title: "Verified Listings", desc: "Every job posting is audited for quality, security, and legitimacy." },
];

const Index = () => {
  const { jobs } = useJobs();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <HeroSection />

      {/* Featured Jobs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">Featured Job Opportunities</h2>
              <p className="text-muted-foreground mt-1">Handpicked positions for top software, design, and business professionals</p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/jobs" className="text-primary hover:text-primary/90">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.slice(0, 6).map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/jobs?category=${encodeURIComponent(cat)}`}
                  className="block bg-card rounded-xl border border-border p-4 text-center text-sm font-medium text-foreground hover:border-primary hover:text-primary hover:shadow-card-hover transition-all duration-200"
                >
                  {cat}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            Why Choose Career Connect Hub
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 text-center shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/75" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Create your free account today to browse openings, track applications, and connect with employers.
          </p>
          <div className="flex justify-center gap-3">
            <Button size="lg" variant="secondary" className="shadow-lg" asChild>
              <Link to="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm" asChild>
              <Link to="/jobs">Browse Open Positions</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
