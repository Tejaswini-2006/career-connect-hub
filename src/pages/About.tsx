import { Link } from "react-router-dom";
import { Briefcase, Target, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const values = [
  { icon: Target, title: "Mission Driven", desc: "Empowering career paths and matching top tech and business talents with visionary employers." },
  { icon: Users, title: "Inclusive Community", desc: "Building transparent, equal opportunities for candidates across all backgrounds and locations." },
  { icon: ShieldCheck, title: "Verified Listings", desc: "Strict verification ensures every job posting and recruiter on Career Connect Hub is legitimate." },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-hero-gradient py-16 text-center text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display font-extrabold text-4xl mb-4">About Career Connect Hub</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Career Connect Hub is a modern job portal designed to connect ambitious professionals with industry-leading employers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-1 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              Bridging the Gap Between Talent and Opportunity
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded with the goal of simplifying the employment lifecycle, Career Connect Hub offers job seekers intuitive search tools, application tracking, and personalized job matches while giving recruiters powerful candidate discovery and listing tools.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you are looking for remote contracts, full-time enterprise roles, or startup leadership positions, Career Connect Hub is your trusted launchpad.
            </p>
            <Button asChild>
              <Link to="/jobs">
                Explore Jobs <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="p-4 bg-muted/40 rounded-xl">
                <p className="font-display font-bold text-3xl text-primary">12,450+</p>
                <p className="text-xs text-muted-foreground mt-1">Jobs Posted</p>
              </div>
              <div className="p-4 bg-muted/40 rounded-xl">
                <p className="font-display font-bold text-3xl text-primary">3,200+</p>
                <p className="text-xs text-muted-foreground mt-1">Companies</p>
              </div>
              <div className="p-4 bg-muted/40 rounded-xl">
                <p className="font-display font-bold text-3xl text-primary">85,000+</p>
                <p className="text-xs text-muted-foreground mt-1">Job Seekers</p>
              </div>
              <div className="p-4 bg-muted/40 rounded-xl">
                <p className="font-display font-bold text-3xl text-primary">9,800+</p>
                <p className="text-xs text-muted-foreground mt-1">Hires Made</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 border-t border-border">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 text-center shadow-card"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
