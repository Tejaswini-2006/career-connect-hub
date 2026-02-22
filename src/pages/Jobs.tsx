import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { mockJobs, categories, locations, jobTypes } from "@/data/mockData";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchQ = !query || job.title.toLowerCase().includes(query.toLowerCase()) || job.company.toLowerCase().includes(query.toLowerCase());
      const matchCat = selectedCategory === "all" || job.category === selectedCategory;
      const matchLoc = selectedLocation === "all" || job.location === selectedLocation;
      const matchType = selectedType === "all" || job.type === selectedType;
      return matchQ && matchCat && matchLoc && matchType;
    });
  }, [query, selectedCategory, selectedLocation, selectedType]);

  const hasFilters = selectedCategory !== "all" || selectedLocation !== "all" || selectedType !== "all" || query;

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedType("all");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-hero-gradient py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-3xl text-primary-foreground">Find Jobs</h1>
          <p className="text-primary-foreground/70 mt-1">Discover {mockJobs.length}+ open positions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Search & Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or company..."
            className="md:max-w-sm"
          />
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />Filters
          </Button>
          <div className={`flex flex-col md:flex-row gap-3 ${showFilters ? "flex" : "hidden md:flex"}`}>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="w-4 h-4 mr-1" />Clear
            </Button>
          )}
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} job{filtered.length !== 1 ? "s" : ""} found</p>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No jobs found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
