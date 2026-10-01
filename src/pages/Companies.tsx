import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, Search, ArrowRight, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useJobs } from "@/context/JobContext";
import { motion } from "framer-motion";

const companyList = [
  { name: "TechNova Inc.", industry: "Technology", location: "San Francisco, CA", logo: "TN", description: "Leading innovation in AI & web cloud technologies.", employees: "500-1000" },
  { name: "GrowthLab", industry: "Marketing", location: "New York, NY", logo: "GL", description: "Empowering B2B SaaS companies with data-driven growth strategies.", employees: "100-250" },
  { name: "DesignCraft Studio", industry: "Design", location: "Remote", logo: "DC", description: "Crafting digital experiences and iconic product interfaces.", employees: "50-100" },
  { name: "FinSight Analytics", industry: "Finance", location: "Chicago, IL", logo: "FS", description: "Transforming financial market intelligence through predictive data.", employees: "250-500" },
  { name: "CloudScale Systems", industry: "Engineering", location: "Seattle, WA", logo: "CS", description: "High-scale infrastructure & distributed microservices solution.", employees: "1000+" },
  { name: "SalesPro Solutions", industry: "Sales", location: "Austin, TX", logo: "SP", description: "Modern sales tech stack powering top enterprise pipelines.", employees: "100-250" },
  { name: "InfraCore", industry: "Technology", location: "Remote", logo: "IC", description: "Cloud native DevOps and automated infrastructure platforms.", employees: "50-100" },
  { name: "PeopleFirst Corp", industry: "Human Resources", location: "Boston, MA", logo: "PF", description: "Revolutionizing modern HR management and workplace culture.", employees: "250-500" },
];

const Companies = () => {
  const { jobs } = useJobs();
  const [search, setSearch] = useState("");

  const filteredCompanies = companyList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-hero-gradient py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground">
            Top Hiring Companies
          </h1>
          <p className="text-primary-foreground/80 mt-2 max-w-xl mx-auto">
            Discover leading employers actively hiring top talent on Career Connect Hub.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies by name, industry, or location..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company, i) => {
            const openJobsCount = jobs.filter((j) => j.company.toLowerCase() === company.name.toLowerCase()).length;

            return (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-lg shrink-0">
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{company.name}</h3>
                      <p className="text-xs text-primary font-medium">{company.industry}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {company.employees} employees
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                    {openJobsCount} Open Job{openJobsCount !== 1 ? "s" : ""}
                  </span>
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/jobs?q=${encodeURIComponent(company.name)}`}>
                      View Jobs <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Companies;
