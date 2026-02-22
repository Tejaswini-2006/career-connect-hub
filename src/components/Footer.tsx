import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => (
  <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-sidebar-foreground mb-3">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            JobFlow
          </Link>
          <p className="text-sm text-sidebar-foreground/60 leading-relaxed">
            Connecting talented professionals with outstanding opportunities worldwide.
          </p>
        </div>
        {[
          { title: "For Job Seekers", links: ["Browse Jobs", "Companies", "Career Advice"] },
          { title: "For Employers", links: ["Post a Job", "Browse Candidates", "Pricing"] },
          { title: "Company", links: ["About Us", "Contact", "Privacy Policy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <span className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary cursor-pointer transition-colors">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 pt-6 border-t border-sidebar-border text-center text-xs text-sidebar-foreground/40">
        © 2026 JobFlow. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
