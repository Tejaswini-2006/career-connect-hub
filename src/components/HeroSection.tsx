import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/mockData";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
            Find Your Dream
            <br />
            Career Today
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Discover thousands of job opportunities from top companies. Your next career move starts here.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 max-w-2xl mx-auto bg-card rounded-xl p-2 shadow-lg flex flex-col sm:flex-row gap-2"
        >
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title or keyword..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-2.5"
            />
          </div>
          <div className="flex items-center gap-2 flex-1 px-3 border-t sm:border-t-0 sm:border-l border-border">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-2.5"
            />
          </div>
          <Button type="submit" size="lg" className="sm:w-auto w-full">
            Search Jobs
          </Button>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-bold text-2xl text-primary-foreground">{s.value}</p>
              <p className="text-sm text-primary-foreground/60 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
